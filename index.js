    fetch('data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Extracting the "Characters" array from the JSON
        const characters = data.Characters;

        // Ref Container Element where characters are to be displayed
        const charactersContainer = document.getElementById('characters-container');

        // Get Container Elements for selected characters and comparison history
        const selectedCharacter1 = document.getElementById('selected-character-1');
        const selectedCharacter2 = document.getElementById('selected-character-2');
        const comparisonHistory = document.getElementById('comparison-history');

        // Function to Filter and Display Characters based on search query and filters
        function filterCharacters() {
          const searchQuery = document.getElementById('search').value.toLowerCase();

          // Get the min and max values for each ability
          // TODO: Test this after implementing UI 
          const strengthMin = parseInt(document.getElementById('strengthMin').value);
          const strengthMax = parseInt(document.getElementById('strengthMax').value);            
          const speedMin = parseInt(document.getElementById('speedMin').value);
          const speedMax = parseInt(document.getElementById('speedMax').value);
          const skillMin = parseInt(document.getElementById('skillMin').value);
          const skillMax = parseInt(document.getElementById('skillMax').value);
          const fearFactorMin = parseInt(document.getElementById('fearFactorMin').value);
          const fearFactorMax = parseInt(document.getElementById('fearFactorMax').value);
          const powerMin = parseInt(document.getElementById('powerMin').value);
          const powerMax = parseInt(document.getElementById('powerMax').value);
          const intelligenceMin = parseInt(document.getElementById('intelligenceMin').value);
          const intelligenceMax = parseInt(document.getElementById('intelligenceMax').value);
          const wealthMin = parseInt(document.getElementById('wealthMin').value);
          const wealthMax = parseInt(document.getElementById('wealthMax').value);


          // Clear the characters container fix
          charactersContainer.innerHTML = '';

          // Iteration over the array of characters & HTML elements for characters filtered
          characters.forEach(character => {
            // Check if the character matches the search query
            if (character.name.toLowerCase().includes(searchQuery) || character.subtitle.toLowerCase().includes(searchQuery)) {
              // Check if the character abilities fall within the specified range
              if (
                character.strength >= strengthMin && character.strength <= strengthMax &&
                character.speed >= speedMin && character.speed <= speedMax &&
                character.skill >= skillMin && character.skill <= skillMax &&
                character.fear_factor >= fearFactorMin && character.fear_factor <= fearFactorMax &&
                character.power >= powerMin && character.power <= powerMax &&
                character.intelligence >= intelligenceMin && character.intelligence <= intelligenceMax &&
                character.wealth >= wealthMin && character.wealth <= wealthMax
              ) {

                const characterDiv = document.createElement('div');
                characterDiv.classList.add('character');

                // Create an image element for the character's image
                const characterImage = document.createElement('img');
                characterImage.src = character.image_url;
                characterImage.alt = character.name;

                // Append the image element to the character div
                characterDiv.appendChild(characterImage);

                // Create a paragraph element for the character's name and subtitle
                const characterInfo = document.createElement('p');
                characterInfo.textContent = `${character.name} - ${character.subtitle}`;

                // Append the paragraph element to the character div
                characterDiv.appendChild(characterInfo);

                // Add a click event listener to select the character
                characterDiv.addEventListener('click', () => selectCharacter(character));

                // Append the character div to the characters container
                charactersContainer.appendChild(characterDiv);
              }
            }
          });
        }

        // Function to select a character for comparison
        function selectCharacter(character) {
          // Check if character is already selected
          if (selectedCharacter1.innerHTML && selectedCharacter2.innerHTML) {
            // Clear the selected characters and comparison history
            comparisonHistory.innerHTML += "<br>"+selectedCharacter1.innerHTML+" vs"+selectedCharacter2.innerHTML ;
            selectedCharacter1.innerHTML = '';
            selectedCharacter2.innerHTML = '';
            
          }

          // Check if selectedCharacter1 is empty
          if (!selectedCharacter1.innerHTML) {
            selectedCharacter1.innerHTML = `<img src="${character.image_url}" alt="${character.name}">`;
          } else if (!selectedCharacter2.innerHTML) {
            selectedCharacter2.innerHTML = `<img src="${character.image_url}" alt="${character.name}">`;
          }
        }

        document.getElementById('search').addEventListener('input', filterCharacters);
        document.getElementById('strengthMin').addEventListener('input', filterCharacters);
        document.getElementById('strengthMax').addEventListener('input', filterCharacters);
        document.getElementById('speedMin').addEventListener('input', filterCharacters);
        document.getElementById('speedMax').addEventListener('input', filterCharacters);
        document.getElementById('skillMin').addEventListener('input', filterCharacters);
        document.getElementById('skillMax').addEventListener('input', filterCharacters);
        document.getElementById('fearFactorMin').addEventListener('input', filterCharacters);
        document.getElementById('fearFactorMax').addEventListener('input', filterCharacters);
        document.getElementById('powerMin').addEventListener('input', filterCharacters);
        document.getElementById('powerMax').addEventListener('input', filterCharacters);
        document.getElementById('intelligenceMin').addEventListener('input', filterCharacters);
        document.getElementById('intelligenceMax').addEventListener('input', filterCharacters);
        document.getElementById('wealthMin').addEventListener('input', filterCharacters);
        document.getElementById('wealthMax').addEventListener('input', filterCharacters);
        
        // Empty containers on first load, FIXED: Loading characters with default filters
        filterCharacters();
      })
      .catch(error => {
        console.error('There was a problem fetching the data:', error);
      });