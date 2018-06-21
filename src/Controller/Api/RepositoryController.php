<?php

namespace App\Controller\Api;

use App\Service\Github\GithubClient;
use App\Service\Redis\RedisCacheManager;
use App\Service\Redis\RedisCacheManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class RepositoryController extends Controller
{
    /**
     * @Route("/api/v1/repository", name="api-repository")
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $githubClient = $this->get(GithubClient::class);

        $cacheManager = $this->get(RedisCacheManager::class);
        $issues = $cacheManager->getCached(
            RedisCacheManagerInterface::KEY_REPOSITORY,
            function () use ($githubClient) {
                return $githubClient->findRepositoryData();
            },
            RedisCacheManagerInterface::TTL_TEN_MINUTES
        );

        return $this->json(['data' => $issues]);
    }
}
