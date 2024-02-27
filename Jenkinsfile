pipeline {
  agent any
  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-token')
    ENV_FILE = credentials('DOC_HUB_ENV')
    IMAGE_VERSION = '1.0'
  }
  stages {
    stage('Cloning our Git') {
      steps {
        sh 'echo "Cloning repository..."'
          git branch: 'main',
          credentialsId: 'jenkins-ssh',
          url: 'git@github.com:neenus/doc-hub-client.git'
      }
    }
    stage('Copy ENV file') {
        steps {
            sh 'echo "copy env file for production build into workspace"'
            withCredentials([file(credentialsId: 'DOC_HUB_ENV', variable: 'ENV_FILE')]) {
              sh 'cp $ENV_FILE .env.production.local'
            }
        }
    }
    stage('Build docker images') {
      steps {
        sh 'echo "Building docker image..."'
        sh "docker build -t neenus007/doc-hub-client:${IMAGE_VERSION}.${BUILD_NUMBER} -f Dockerfile.prod ."
        sh 'docker build -t neenus007/doc-hub-client:latest -f Dockerfile.prod .'
      }
    }
    stage('Login to DockerHub') {
      steps {
        sh 'echo "Logging in to DockerHub..."'
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
      }
    }
    stage('Push images to DockerHub') {
      steps {
        sh 'echo "Pushing to DockerHub..."'
        sh "docker push neenus007/doc-hub-client:${IMAGE_VERSION}.${BUILD_NUMBER}"
        sh 'docker push neenus007/doc-hub-client:latest'
      }
    }
    stage('Logout from DockerHub') {
      steps {
        sh 'echo "Logging out from DockerHub..."'
        sh 'docker logout'
      }
    }
  }
}
