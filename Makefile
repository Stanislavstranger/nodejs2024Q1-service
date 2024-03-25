run: 
	sudo docker-compose up
run-dev: 
	sudo docker-compose up
stop:
	sudo docker-compose down
delete:
	sudo docker rmi nodeapp:latest postgres:latest
