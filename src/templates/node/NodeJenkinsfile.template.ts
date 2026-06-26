import { UserChoices } from "../../types";

export const NodeJenkinsTemplate = (choices: UserChoices) =>
  `
pipeline {
    agent any
    tools {
        nodejs 'Node20' // Ensure this matches your Jenkins global tool configuration
    }
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("my-node-app:\${env.BUILD_ID}")
                }
            }
        }
    }
}
`.trim();
