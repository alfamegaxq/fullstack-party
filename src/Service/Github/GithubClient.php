<?php

namespace App\Service\Github;

use App\Service\Redis\RedisCacheManager;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class GithubClient
{
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
     * @param string $username
     * @param string $password
     *
     * @return void
     */
    public function login(string $username, ?string $password): void
    {
        //@TODO fix login
//        if ($this->session->has('githubUser') && $this->session->has('githubToken')) {
//            $this->client->authenticate(
//                $username,
//                $password,
//                \Github\Client::AUTH_HTTP_TOKEN
//            );
//        } else {
//            $this->client->authenticate($username, $password, \Github\Client::AUTH_HTTP_PASSWORD);
//
//            if (!$this->cacheManager->has(RedisCacheManagerInterface::KEY_USER_TOKEN . $username)) {
//                $token = $this->client->authorization()->create(['scopes' => ['repo', 'user'], 'note' => 'testio']);
//                $token = $token['token'];
//                $this->cacheManager->set(RedisCacheManagerInterface::KEY_USER_TOKEN . $username, $token);
//            } else {
//                $token = $this->cacheManager->get(RedisCacheManagerInterface::KEY_USER_TOKEN . $username);
//            }
//
//            $this->session->set('githubToken', $token);
//            $this->session->set('githubUser', $username);
//        }

        $this->client->authorization()->all();
    }

    /**
     * @return array
     */
    public function findIssues(): array
    {
        return $this->client->issue()->all('KnpLabs', 'php-github-api');
    }

    /**
     * @param int $issueId
     *
     * @return array
     */
    public function findOneIssue(int $issueId): array
    {
        return $this->client->issue()->show('knpLabs', 'php-github-api', $issueId);
    }

    /**
     * @param int $issueId
     *
     * @return array
     */
    public function findIssueComments(int $issueId): array
    {
        return $this->client->issue()->comments()->all('knpLabs', 'php-github-api', $issueId);
    }
}
