<?php

namespace App\Service\Github;

class GithubClientFactory
{
    /**
     * @return \Github\Client
     */
    public static function createClient(): \Github\Client
    {
        return new \Github\Client();
    }
}
