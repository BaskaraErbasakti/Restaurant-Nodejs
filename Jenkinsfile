def builderDocker
def CommitHash

pipeline {
    
    environment {
        registry = 'baskaraerbasakti/backend'
        registryCredential = 'docker-hub'
    }

    agent any

    parameters {
        booleanParam(name: 'RUNTEST', defaultValue: true, description: 'Toggle this value for testing')
        choice(name: 'CICD', choices: ['CI', 'CICD'], description: 'Pick something')
    }

    stages {
        stage('Build') { 
            steps {
                nodejs("node12") {
                    sh 'npm install'
                } 
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    CommitHash = sh (script : "git log -n 1 --pretty=format:'%H'", returnStdout: true)
                    builderDocker = docker.build("baskaraerbasakti/backend:${CommitHash}")
                }
            }
        }

        stage('Test') {
            when {
                expression {
                    params.RUNTEST
                }
            }
            steps {
                script {
                    builderDocker.inside {
                        sh 'echo passed'
                    }
                }
            }
        }

        stage('Push Image') {
            when {
                expression {
                    params.RUNTEST
                }
            }

            steps {
                script {
                    docker.withRegistry( '', registryCredential ) {
                        builderDocker.push("${env.GIT_BRANCH}")
                    }     
                }
            }
        }

        stage('Deploy on developmen') {
            when {
                expression {
                    params.CICD == 'CICD' && BRANCH_NAME == 'Dev'
                }
            } 
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'Developmen',
                            verbose: false,
                            transfers: [
                                sshTransfer(
                                    sourceFiles: 'docker-compose.yml',
                                    remoteDirectory: 'backend',
                                    execCommand: 'cd backend; docker stop vue; docker-compose up -d',
                                    execTimeout: 120000,
                                )
                            ]
                        )
                    ]
                ) 
            }
        }
        stage('Deploy on production') {
            when {
                expression {
                    params.CICD == 'CICD' && BRANCH_NAME == 'Prod'
                }
            }
            steps {
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'Production',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'docker-compose.yml',
                                        remoteDirectory: 'backend',
                                        execCommand: 'cd backend; docker stop vue; docker-compose up -d',
                                        execTimeout: 120000,
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
    }
} 