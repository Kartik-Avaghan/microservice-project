pipeline {
    agent any

    environment {
        DOCKER_USERNAME = "kartikavaghan"
    }

    tools {
        maven 'Maven3'
        jdk 'JDK21'
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Eureka Server') {
            steps {
                dir('EurekaServer') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build API Gateway') {
            steps {
                dir('ApiGateway') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build PG Service') {
            steps {
                dir('pg_backend') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Payment Service') {
            steps {
                dir('PaymentGateway') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                bat 'docker compose build'
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
                    bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                }
            }
        }

        stage('Push Images') {
            steps {
                bat 'docker push kartikavaghan/eureka-server:latest'
                bat 'docker push kartikavaghan/api-gateway:latest'
                bat 'docker push kartikavaghan/pg-service:latest'
                bat 'docker push kartikavaghan/payment-service:latest'
            }
        }

        stage('Deploy') {
    steps {
        bat 'docker compose down'
        bat 'docker compose up -d'
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
}
