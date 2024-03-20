pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-token')
        ENV_FILE_ID = '32acfc7f-88cf-4fd1-b60a-716c6503ced7'
        IMAGE_VERSION = '1.0'
    }
    stages {
        stage('Copy ENV file') {
            steps {
                sh 'echo "copy env file for production build into workspace"'
                configFileProvider([configFile(fileId: ENV_FILE_ID, targetLocation: '.env.production.local')]) {
                    sh 'echo "env file copied"'
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
