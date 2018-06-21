<?php

namespace App\Service\Redis;

interface RedisCacheManagerInterface
{
    const TTL_TEN_MINUTES = 600;
    const TTL_HOUR = 3600;

    const KEY_ISSUES = 'issues';
    const KEY_ONE_ISSUE = 'issue:';
    const KEY_ISSUE_COMMENTS = 'comments:';
    const KEY_REPOSITORY = 'repository:';
}
