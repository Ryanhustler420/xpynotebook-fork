# xPynotebook Fork

IDEA is that every student of xCodeClazz will have a personal coding playground with their email slug like this [email.code.xcodeclazz.com](#)

### Requirement

Create these branches: `master`

## **[Docker](https://hub.docker.com)** profile

| username | Password | Image(s)                |
| -------- | -------- | ----------------------- |
| username | password | username/img-production |

## **[Render](https://render.com)** profile

| email               | Password | Image                   |
| ------------------- | -------- | ----------------------- |
| username@domain.com | password | username/img-production |

## **[Supabase](https://supabase.com)** profile

| email               | Password | Organization | Password |
| ------------------- | -------- | ------------ | -------- |
| username@domain.com | username | bucket-name  | password |

## Workflow Env

> You can pre create these, since these details are not tighly coupled with this repository

- WF\_<span style="color:pink;">**PASSWORD**</span>\_PRODUCTION : `login-password`
- WF\_<span style="color:red;">**DOCKER**</span>\_PRODUCTION_ACCOUNT_USERNAME : `username`
- WF\_<span style="color:red;">**DOCKER**</span>\_PRODUCTION_ACCOUNT_PASSWORD : `password`
- WF\_<span style="color:red;">**DOCKER**</span>\_PRODUCTION_IMAGE_NAME : `username/img-production`
- WF\_<span style="color:orange;">**SUPABASE**</span>\_PRODUCTION_BUCKET_NAME : `bucket`
- WF\_<span style="color:orange;">**SUPABASE**</span>\_PRODUCTION_ASSETS_PATH : `/sources`
- WF\_<span style="color:orange;">**SUPABASE**</span>\_PRODUCTION_KEY : `jwt`
- WF\_<span style="color:orange;">**SUPABASE**</span>\_PRODUCTION_URL : `https://xyz.supabase.co`

> Once you have docker image on dockerhub

- WF\_<span style="color:green;">**RENDER**</span>\_PRODUCTION_APP_SERVICE_ID : `srv-xyz`
- WF\_<span style="color:green;">**RENDER**</span>\_PRODUCTION_PROFILE_AUTH_API_TOKEN : `rnd_xyz`

## Keep in mind

- Update your repository secrets
- Make your docker image private once they published
- Use lower case for login and building docker images

### Rollback

- Todo
