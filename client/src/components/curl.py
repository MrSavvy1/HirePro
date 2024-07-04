def count_curly_braces(file_path):
	# Initialize counters for opening and closing braces
	opening_brace_count = 0
	closing_brace_count = 0

	try:
			# Open the file in read mode
			with open(file_path, 'r') as file:
					# Read the file line by line
					for line in file:
							# Count opening and closing braces in the line
							opening_brace_count += line.count('{')
							closing_brace_count += line.count('}')

			# Print the counts
			print(f"Number of opening braces: {opening_brace_count}")
			print(f"Number of closing braces: {closing_brace_count}")

	except FileNotFoundError:
			print(f"The file {file_path} does not exist.")

# Specify the path to your file
file_path = 'App.css'

# Call the function with the file path
count_curly_braces(file_path)
