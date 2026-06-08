pipeline {
agent any

```
environment {
    DOCKER_USERNAME = "kartikavaghan"
    IMAGE_TAG = "${BUILD_NUMBER}"
}

tools {
    maven 'Maven'
    jdk 'JDK17'
}

stages {

    stage('Checkout Code') {
        steps {
            git branch: 'main',
                url: 'https://github.com/your-username/your-repo.git'
        }
    }

    stage('Build Services') {
        steps {
            bat 'mvn clean package -DskipTests'
        }
    }

    stage('Build Docker Images') {
        steps {
            bat '''
            docker build -t %DOCKER_USERNAME%/eureka-server:%IMAGE_TAG% ./eureka-server

            docker build -t %DOCKER_USERNAME%/api-gateway:%IMAGE_TAG% ./api-gateway

            docker build -t %DOCKER_USERNAME%/pg-service:%IMAGE_TAG% ./pg-service

            docker build -t %DOCKER_USERNAME%/payment-service:%IMAGE_TAG% ./payment-service
            '''
        }
    }

    stage('Docker Login') {
        steps {
            withCredentials([
                usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )
            ]) {

                bat '''
                echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                '''
            }
        }
    }

    stage('Push Images') {
        steps {
            bat '''
            docker push %DOCKER_USERNAME%/eureka-server:%IMAGE_TAG%

            docker push %DOCKER_USERNAME%/api-gateway:%IMAGE_TAG%

            docker push %DOCKER_USERNAME%/pg-service:%IMAGE_TAG%

            docker push %DOCKER_USERNAME%/payment-service:%IMAGE_TAG%
            '''
        }
    }

    stage('Tag Latest') {
        steps {
            bat '''
            docker tag %DOCKER_USERNAME%/eureka-server:%IMAGE_TAG% %DOCKER_USERNAME%/eureka-server:latest
            docker tag %DOCKER_USERNAME%/api-gateway:%IMAGE_TAG% %DOCKER_USERNAME%/api-gateway:latest
            docker tag %DOCKER_USERNAME%/pg-service:%IMAGE_TAG% %DOCKER_USERNAME%/pg-service:latest
            docker tag %DOCKER_USERNAME%/payment-service:%IMAGE_TAG% %DOCKER_USERNAME%/payment-service:latest

            docker push %DOCKER_USERNAME%/eureka-server:latest
            docker push %DOCKER_USERNAME%/api-gateway:latest
            docker push %DOCKER_USERNAME%/pg-service:latest
            docker push %DOCKER_USERNAME%/payment-service:latest
            '''
        }
    }

}

post {
    success {
        echo 'Build and Push Successful'
    }

    failure {
        echo 'Pipeline Failed'
    }
}
```

}
