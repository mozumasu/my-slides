.PHONY: pv

pv:
	@selected_dir=$$(ls -d */ | sed 's|//|/|g' | grep -vE '^(node_modules|dist)' | fzf); \
	if [ -n "$$selected_dir" ]; then \
		echo "Selected directory: $$selected_dir"; \
		if [ -d "$${selected_dir}src" ]; then \
			cd "$${selected_dir}src" && pnpm run dev; \
		else \
			echo "not found src/ in $$selected_dir"; \
		fi \
	else \
		echo "No directory selected"; \
	fi
