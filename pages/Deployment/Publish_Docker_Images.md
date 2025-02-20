---
title: Publish Docker Images
parent: Deployment
layout: page
nav_order: 4
---

# Publish Docker Containers

## Add Container as package to your repository:

[github-container-registry]: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry

* register and get an access token
  * [How to GitHub container registry][github-container-registry]
  * login via terminal:

  ```sh
  echo <YOUR_GITHUB_PERSONAL_ACCESS_TOKEN> | docker login ghcr.io -u <YOUR_GITHUB_USERNAME> --password-stdin
  ```

* get list of available images:
  
  ```js
   docker images
   /*
   REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
   backend-v2    latest    3casdc47d789   20 hours ago   2.3GB
   */
  ```

* tag your image

   ```sh
   docker tag <THE_CONTAINER_HASH_ID> ghcr.io/<NAMESPACE OR REPONAME>/<NEW_IMAGE_NAME>:<TAG>
   #docker tag 3ca1ec47ef89 ghcr.io/marcoschaefert/davis-frontend:latest
   ```

* push images:

  ```sh
  docker push ghcr.io/<NAMESPACE OR REPONAME>/<IMAGE_NAME>:<TAG>
  #docker push ghcr.io/marcoschaefert/davis-frontend:latest
  ```

* then call the URL (example: ghcr.io/marcoschaefert/davis-db:latest)
 and connect container to your repo.
