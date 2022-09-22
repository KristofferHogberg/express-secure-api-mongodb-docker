# Upload docker image to your Github account and adding it to OpenShift sandbox

**Preface:**

This document assumes you already have a Github account and that you know the basics of Docker commands. You also need to have a working image and a Red Hat Openshift sandbox account.

**Step 1: Generate a Github Personal Access Token (PAT):**

Go to [https://github.com/settings/tokens](https://github.com/settings/tokens) or manually: 

**Settings** (top right corner on profile) > **Developer Settings** > **Personal access tokens**



Once there, click on **Generate new token.**




Under **Note**, write a descriptive name; for example “Docker images”.



Now you can choose what rights the token will have, the important ones are 

**write: packages **and **read:packages. **


Click on generate token and **copy and save it** somewhere because you will not be able to see it again.


**Step 2: Login to GitHub Container Registry (ghcr).**

Open a terminal with sudo rights or command prompt with admin rights and type 

‘docker login ghcr.io -u &lt;github username>’.

If done correctly it will ask for your password, paste your **PAT **you made in step 1. **Note that you will not see what you type or paste in.**



**Step 3: push your image to ghcr.io:**

Now you need to rename your existing image or create a new one to 

‘ghcr.io/&lt;git username>/&lt;name of image>:&lt;tag>’

Example, build a new image:

‘docker image build -t ghcr.io/kimalmh/simpleweb:v1 .’ **Note the . (dot) at the end.**


Example, rename existing image:

‘docker tag &lt;name/id of existing image> ghcr.io/&lt;git username>/&lt;name of image>:&lt;tag>



Now it's time to push it to Github, type 

‘docker push ghcr.io/&lt;git username>/&lt;name of image>&lt;tag>’

Example:

‘docker push ghcr.io/kimalmh/simpleweb:v1’




Now it exists on your Github account, to see if it is there go to your profile on Github ‘[https://github.com/](https://github.com/)&lt;username>’

Then go to packages.


**Step 4, add your ghcr credentials to OpenShift (only necessary if your ghcr package is private):**

Go to your openshift web sandbox and click on Secrets


In the top right corner, click on Create


Then click on **Image pull secret** 


Then fill in the required info. 

**Password** is the** PAT **you did earlier**.**

**Registry server address **is **ghcr.io**

**Username **is you Github username


Click on create once you are done.

**Step 5, add your image to OpenShift:**

Now, go to your openshift web sandbox and click on add.


Next, click on Container images




In the **Image name from external registry**, type in you ghcr address:




Choose or create an application if you wish and give it a name of your choice, then click on create.

You should now have a working container from your image!
