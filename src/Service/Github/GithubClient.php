<?php

namespace App\Service\Github;

use App\Service\Redis\RedisCacheManager;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class GithubClient
{
    const GITHUB_USERNAME = 'KnpLabs';
    const GITHUB_REPOSITORY = 'php-github-api';

    /**
     * @var \Github\Client
     */
    private $client;

    /**
     * @var SessionInterface
     */
    private $session;

    /**
     * @var RedisCacheManager
     */
    private $cacheManager;

    /**
     * @param \Github\Client    $client
     * @param SessionInterface  $session
     * @param RedisCacheManager $cacheManager
     */
    public function __construct(\Github\Client $client, SessionInterface $session, RedisCacheManager $cacheManager)
    {
        $this->client = $client;
        $this->session = $session;
        $this->cacheManager = $cacheManager;
    }

    /**
     * @param string $accesstoken
     *
     * @return void
     */
    public function login(string $accesstoken): void
    {
        $this->session->set('githubToken', $accesstoken);
    }

    /**
     * @return void
     */
    public function logout(): void
    {
        $this->session->remove('githubToken');
    }

    /**
     * @return bool
     */
    public function isUserAuthorized(): bool
    {
        return $this->session->has('githubToken');
    }

    /**
     * @return array
     */
    public function findRepositoryData(): array
    {
        return $this->client->repo()->show(self::GITHUB_USERNAME, self::GITHUB_REPOSITORY);
    }

    /**
     * @param int $page
     *
     * @return array
     */
    public function findIssues(int $page): array
    {
        return $this->client->issue()->all(self::GITHUB_USERNAME, self::GITHUB_REPOSITORY, [
            'page' => $page,
            'per_page' => 4,
        ]);
    }

    /**
     * @param int $issueId
     *
     * @return array
     */
    public function findOneIssue(int $issueId): array
    {
        return $this->client->issue()->show(self::GITHUB_USERNAME, self::GITHUB_REPOSITORY, $issueId);
    }

    /**
     * @param int $issueId
     *
     * @return array
     */
    public function findIssueComments(int $issueId): array
    {
        return $this->client->issue()->comments()->all(self::GITHUB_USERNAME, self::GITHUB_REPOSITORY, $issueId);
    }
}
