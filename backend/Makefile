.PHONY: test

makemigrations:
	@echo "Creating migrations..."
	@if [ -z "$(NAME)" ]; then \
		rye run alembic revision --autogenerate; \
	else \
		rye run alembic revision --autogenerate -m "$(NAME)"; \
	fi

migrate:
	@echo "Migrating database..."
	@rye run alembic upgrade head
