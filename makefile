setupMockDb: 
	docker-compose up -d

sqlbash:
	docker exec -it ${container} bash
