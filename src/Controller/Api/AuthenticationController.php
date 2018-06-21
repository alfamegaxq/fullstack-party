<?php

namespace App\Controller\Api;

use App\Service\Github\GithubClient;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class AuthenticationController extends Controller
{
    /**
     * @Route("/api/v1/login", name="api-login")
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $this->get(GithubClient::class)->login('***', '***');

        return $this->json([]);
    }
}
