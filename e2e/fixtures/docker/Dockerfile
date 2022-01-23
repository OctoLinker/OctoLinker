// @OctoLinkerResolve(https://hub.docker.com/_/php)
FROM php:php:5.6-apache

// @OctoLinkerResolve(https://hub.docker.com/r/datadog/agent)
FROM datadog/agent:7-rc

// @OctoLinkerResolve(https://ghcr.io/flexget/flexget)
FROM ghcr.io/flexget/flexget:3.2.12

// @OctoLinkerResolve(<root>/docker/docker-entrypoint.sh)
ENTRYPOINT ["docker-entrypoint.sh"]
