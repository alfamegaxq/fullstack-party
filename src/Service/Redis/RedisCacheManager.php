<?php

namespace App\Service\Redis;

use Predis\Client;

class RedisCacheManager implements RedisCacheManagerInterface
{
    /**
     * @var Client
     */
    private $client;

    /**
     * @param Client $client
     */
    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    /**
     * @param string $key
     *
     * @return mixed
     */
    public function get(string $key)
    {
        return $this->client->get($key);
    }

    /**
     * @param string $key
     *
     * @return bool
     */
    public function has(string $key): bool
    {
        return $this->client->exists($key);
    }

    /**
     * @param string   $key
     * @param mixed    $content
     * @param int|null $ttl
     *
     * @return void
     */
    public function set(string $key, $content, ?int $ttl = null): void
    {
        $cache = \json_encode($content);
        if ($ttl) {
            $this->client->set($key, $cache, 'EX', $ttl);
        } else {
            $this->client->set($key, $cache);
        }
    }

    /**
     * @param string   $key
     * @param callable $callback
     * @param int      $ttl
     *
     * @return array
     */
    public function getCached(string $key, callable $callback, int $ttl): array
    {
        if ($this->has($key)) {
            return \json_decode($this->get($key), true);
        }

        $data = $callback();
        $this->set($key, $data, $ttl);

        return $data;
    }
}
