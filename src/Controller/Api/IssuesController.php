<?php

namespace App\Controller\Api;

use App\Service\Github\GithubClient;
use App\Service\Redis\RedisCacheManager;
use App\Service\Redis\RedisCacheManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class IssuesController extends Controller
{
    /**
     * @Route("/api/v1/issues", name="api-issues")
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $githubClient = $this->get(GithubClient::class);

        $cacheManager = $this->get(RedisCacheManager::class);
        $issues = $cacheManager->getCached(
            RedisCacheManagerInterface::KEY_ISSUES,
            function () use ($githubClient) {
                return $githubClient->findIssues();
            },
            RedisCacheManagerInterface::TTL_TEN_MINUTES
        );

        return $this->json($issues);
    }
}
