---
title: Publish Docker Containers
parent: DocuDev - How to use?
layout: page
nav_order: 4
---

# Publish Docker Containers


### Add Container as package to your repository:
[github-container-registry]: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry

* register and get an access token
  * [How to GitHub container registry][github-container-registry]
  * login via terminal:
    ```sh
    echo <YOUR_GITHUB_PERSONAL_ACCESS_TOKEN> | docker login ghcr.io -u <YOUR_GITHUB_USERNAME> --password-stdin
    ```
* get list of avaialbe images:
  ```sh
   docker images
  ```
* tag your image
   ```sh
   docker tag <THE_CONTAINER_HASH> ghcr.io/NAMESPACE/NEW_IMAGE_NAME:latest
   ```
* push images:
  ```sh
  docker push ghcr.io/<OWNER>/<IMAGE_NAME>:<TAG>
  ```
* example: ```ghcr.io/marcoschaefert/db:latest```
* then call the URL (example: ghcr.io/marcoschaefert/davis-db:latest)
 and connect container to your repo.
