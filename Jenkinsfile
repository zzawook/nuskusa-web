pipeline {
    agent any

    environment {
        InfraGitUrl = "https://github.com/NUS-Korea-Society/nuskusa-infra-single.git"
    }

    options {
        skipDefaultCheckout(true)
    }

    stages {
        stage("Remove previous versions") {
            steps {
                sh 'rm -rf nuskusa*'
            }
        }

        stage("Pull") {
            steps {
                sh 'git clone ${InfraGitUrl}'
            }
        }

        stage("Deploy") {
            steps {
                dir("nuskusa-infra-single") {
                    sh 'sudo -E docker stop nginx'
                    sh 'sudo -E docker compose up -d --build nginx'
                }
            }
        }

        stage('Finish') {
            steps{
                sh 'sudo docker images -qf dangling=true | xargs -I{} sudo docker rmi {}'
            }
        }
    }
}