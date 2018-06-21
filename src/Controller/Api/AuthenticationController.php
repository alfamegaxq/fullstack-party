<?php

namespace App\Controller\Api;

use App\Service\Github\GithubClient;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class AuthenticationController extends Controller
{
    /**
     * @Route("/api/v1/login", name="api-login")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        $this->get(GithubClient::class)->login($request->request->get('token'));

        return $this->json([]);
    }

    /**
     * @Route("/api/v1/logout", name="api-logout")
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        $this->get(GithubClient::class)->logout();

        return $this->json([]);
    }
}
