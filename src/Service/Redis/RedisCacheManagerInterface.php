<?php

namespace App\Service\Redis;

interface RedisCacheManagerInterface
{
    const TTL_TEN_MINUTES = 600;

    const KEY_USER_TOKEN = 'users:tokens:';
    const KEY_ISSUES = 'issues';
    const KEY_ONE_ISSUE = 'issue:';
}
