<?php

namespace App\EventSubscriber;

use App\Controller\Api\AuthenticationController;
use App\Controller\TokenAuthenticatedController;
use App\Service\Github\GithubClient;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\KernelEvents;

class TokenSubscriber implements EventSubscriberInterface
{
    /**
     * @var GithubClient
     */
    private $githubClient;

    /**
     * @param GithubClient $githubClient
     */
    public function __construct(GithubClient $githubClient)
    {
        $this->githubClient = $githubClient;
    }

    /**
     * @param FilterControllerEvent $event
     *
     * @return void
     */
    public function onKernelController(FilterControllerEvent $event): void
    {
        $controller = $event->getController();

        if (!is_array($controller)) {
            return;
        }

        if ($controller[0] instanceof Controller && !($controller[0] instanceof AuthenticationController)) {
            if (!$this->githubClient->isUserAuthorized()) {
                throw new AccessDeniedHttpException();
            }
        }
    }

    /**
     * @return array
     */
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::CONTROLLER => 'onKernelController',
        ];
    }
}
