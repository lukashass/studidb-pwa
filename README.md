# studidb-pwa

Docker image to turn StudiDB into a installable PWA.

Example run command:

```shell
docker run -d -p 80:80 --env URL=example.com lukashass/studidb-pwa
```

## TODO

* find a better solution than `transform` to hide menu when logged out
