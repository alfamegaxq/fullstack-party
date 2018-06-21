<?php

namespace App\Controller\Api;

use App\Service\Github\GithubClient;
use App\Service\Redis\RedisCacheManager;
use App\Service\Redis\RedisCacheManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class IssuesController extends Controller
{
    /**
     * @Route("/api/v1/issues", name="api-issues")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $page = $request->query->get('page', 1) - 1;
        $githubClient = $this->get(GithubClient::class);

        $cacheManager = $this->get(RedisCacheManager::class);
        $issues = $cacheManager->getCached(
            RedisCacheManagerInterface::KEY_ISSUES . ':' . $page,
            function () use ($githubClient, $page) {
                return $githubClient->findIssues($page);
            },
            RedisCacheManagerInterface::TTL_TEN_MINUTES
        );

        return $this->json(['data' => $issues]);
    }

    /**
     * @Route("/api/v1/issues/{issueId}", name="api-one-issue")
     *
     * @param int $issueId
     *
     * @return JsonResponse
     */
    public function oneIssue(int $issueId): JsonResponse
    {
        $githubClient = $this->get(GithubClient::class);

        $cacheManager = $this->get(RedisCacheManager::class);
        $issue = $cacheManager->getCached(
            RedisCacheManagerInterface::KEY_ONE_ISSUE . $issueId,
            function () use ($githubClient, $issueId) {
                return $githubClient->findOneIssue($issueId);
            },
            RedisCacheManagerInterface::TTL_TEN_MINUTES
        );

        return $this->json(['data' => $issue]);
    }

    /**
     * @Route("/api/v1/issues/{issueId}/comments", name="api-one-issue-comments")
     *
     * @param int $issueId
     *
     * @return JsonResponse
     */
    public function issueComments(int $issueId): JsonResponse
    {
        $githubClient = $this->get(GithubClient::class);

        $cacheManager = $this->get(RedisCacheManager::class);
        $issue = $cacheManager->getCached(
            RedisCacheManagerInterface::KEY_ISSUE_COMMENTS . $issueId,
            function () use ($githubClient, $issueId) {
                return $githubClient->findIssueComments($issueId);
            },
            RedisCacheManagerInterface::TTL_TEN_MINUTES
        );

        return $this->json(['data' => $issue]);
    }
}
