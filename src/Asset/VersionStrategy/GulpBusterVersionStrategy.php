<?php

namespace App\Asset\VersionStrategy;

use Symfony\Component\Asset\VersionStrategy\VersionStrategyInterface;

class GulpBusterVersionStrategy implements VersionStrategyInterface
{
    /**
     * @var string
     */
    private $manifestPath;

    /**
     * @var string
     */
    private $format;

    /**
     * @var string[]
     */
    private $hashes;

    /**
     * @param string      $manifestPath
     * @param string|null $format
     */
    public function __construct(string $manifestPath, ?string $format = null)
    {
        $this->manifestPath = $manifestPath;
        $this->format = $format ?: '%s?%s';
    }

    /**
     * @param mixed $path
     *
     * @return string
     */
    public function getVersion($path): string
    {
        $path = 'public/' . $path;

        if (!is_array($this->hashes)) {
            $this->hashes = $this->loadManifest();
        }

        return isset($this->hashes[$path]) ? $this->hashes[$path] : '';
    }

    /**
     * @param mixed $path
     *
     * @return string
     */
    public function applyVersion($path): string
    {
        $version = $this->getVersion($path);

        if ('' === $version) {
            return $path;
        }

        $versionized = sprintf($this->format, ltrim($path, '/'), $version);

        if ($path && '/' === $path[0]) {
            return '/' . $versionized;
        }

        return $versionized;
    }

    /**
     * @return array
     */
    private function loadManifest(): array
    {
        return json_decode(file_get_contents($this->manifestPath), true);
    }
}
