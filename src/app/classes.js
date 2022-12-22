export class InputData {
  /**
   * 
   * @param {!Person[]} people 
   * @param {!Character[]} characters 
   * @param {!Shot[]} shots 
   */
  constructor(people, characters, shots) {
    this.people = people;
    this.characters = characters;
    this.shots = shots;
  }

  /**
   * 
   * @param {!Object} json 
   * @returns {!InputData}
   * 
   * @throws if the input data is not valid
   */
  static fromSaveable(json) {
    checkJsonMissesProperty('InputData', json, 'people', true);
    checkJsonMissesProperty('InputData', json, 'characters', true);
    checkJsonMissesProperty('InputData', json, 'shots', true);
    const people = json.people.map(Person.fromSaveable);
    const characters = json.characters.map(c => Character.fromSaveable(c, people));
    const shots = json.shots.map(s => Shot.fromSaveable(s, characters));
    return new InputData(people, characters, shots);
  }

  /**
   * 
   * @returns {!Object}
   */
  toSaveable() {
    return {
      people: this.people,
      characters: this.characters.map(c => c.toSaveable()),
      shots: this.shots.map(s => s.toSaveable())
    }
  }
}

export class Shot {
  /**
  * @param {!string} shotName Name of the Shot, must be unique
  * @param {?(string|'greenscreen')} location Set/Setting for the shot or null
  * @param {!string[]} props List of required props
  * @param {!CharacterInCostume[]} characters List of required characters in costumes
  */
  constructor(shotName, characters, props, location) {
    this.shotName = shotName;
    this.characters = characters;
    this.props = props;
    this.location = location;
  }

  /**
   * 
   * @param {!Object} json
   * @param {!Character[]} characters List of the whole cast of characters (ALL).
   * @returns {!Shot}
   */
  static fromSaveable(json, characters) {
    checkJsonMissesProperty('Shot', json, 'shotName');
    checkJsonMissesProperty('Shot', json, 'characters', true);
    checkJsonMissesProperty('Shot', json, 'props', true);
    return new Shot(
      json.shotName,
      json.characters.map(c => CharacterInCostume.fromSaveable(c, characters)),
      json.props,
      json.location
    );
  }

  /**
   * 
   * @returns {!Object}
   */
  toSaveable() {
    return {
      shotName: this.shotName,
      characters: this.characters.map(c => c.toSaveable()),
      props: this.props,
      location: this.location
    }
  }

  copy() {
    return new Shot(
      this.shotName,
      this.characters,
      this.props,
      this.location
    );
  }
}

export class CharacterInCostume {
  /**
  * @param {!Character} character a character
  * @param {!string} costume wearing a costume
  */
  constructor(character, costume) {
    this.character = character;
    this.costume = costume;
  }

  /**
   * 
   * @param {!Object} json 
   * @param {!Character[]} characters List of the whole cast of characters (ALL).
   * @returns {!CharacterInCostume} a representation of a character wearing a costume.
   */
  static fromSaveable(json, characters) {
    checkJsonMissesProperty('CharacterInCostume', json, 'character');
    checkJsonMissesProperty('CharacterInCostume', json, 'costume');
    return new CharacterInCostume(
      characters.find(c => c.characterName === json.character),
      json.costume
    );
  }

  /**
   * 
   * @returns {!Object}
   */
  toSaveable() {
    return {
      character: this.character.characterName,
      costume: this.costume
    }
  }
}

export class Character {
  /**
  * @param {!string} characterName Name of the character, must be unique
  * @param {!Person} person The person playing the character
  */
  constructor(characterName, person) {
    this.characterName = characterName;
    this.person = person;
  }

  /**
   * 
   * @param {!Object} json 
   * @param {!People[]} people List of the whole cast of actors (ALL).
   * @returns {!Character}
   */
  static fromSaveable(json, people) {
    checkJsonMissesProperty('Character', json, 'characterName');
    checkJsonMissesProperty('Character', json, 'person');
    return new Character(
      json.characterName,
      people.find(p => p.name === json.person)
    );
  }

  /**
   * 
   * @returns {!Object}
   */
  toSaveable() {
    return {
      characterName: this.characterName, 
      person: this.person.name
    }
  }
}

export class Person {
  /**
  * @param name Name of the actor, must be unique
  */
  constructor(name) {
    this.name = name;
  }

  /**
   * 
   * @param {!Object} json 
   * @returns {!Person}
   */
  static fromSaveable(json) {
    checkJsonMissesProperty('Person', json, 'name');
    return new Person(json.name);
  }

  /**
   * 
   * @returns {!Object}
   */
  toSaveable() {
    return {
      name: this.name
    }
  }
}

/**
 * Check the Object to have a property and throws if encountering an error.
 * 
 * @param {string} parent Identifier for the throwing class or method
 * @param {!Object} json The object to be checked
 * @param {!string} key The key to check for 
 * @param {?boolean} mustBeArray Also check if the value of the key is an array?
 * 
 * @throws {string} An error if a check fails
 */
function checkJsonMissesProperty(parent, json, key, mustBeArray) {
  if (!json[key]) {
    err(`'${JSON.stringify(json)}' must define '${key}'`);
  }
  if (mustBeArray && !Array.isArray(json[key])) {
    err(`'${key}' must be an array, but is '${json[key]}'`);
  }

  function err(msg) {
    throw `Unmarshalling-Error in class ${parent.toUpperCase()}: ${msg}`;
  }
}
