InputData = class InputData {
  constructor(people, characters, shots) {
    this.people = people;
    this.characters = characters;
    this.shots = shots;
  }

  static fromJSON(json) {
    checkJsonMissesProperty('InputData', json, 'people', true);
    checkJsonMissesProperty('InputData', json, 'characters', true);
    checkJsonMissesProperty('InputData', json, 'shots', true);
    const people = json.people.map(Person.fromJSON);
    const characters = json.characters.map(c => Character.fromJSON(c, people));
    const shots = json.shots.map(s => Shot.fromJSON(s, characters));
    return new InputData(people, characters, shots);
  }
}

Shot = class Shot {
  /*
  * @param {string} name = id
  * @param {string | null | 'greenscreen'} location = null, name of setting, or greenscreen
  */
  constructor(shotName, characters, props, location) {
    this.shotName = shotName;
    this.characters = characters;
    this.props = props;
    this.location = location;
  }

  static fromJSON(json, characters) {
    checkJsonMissesProperty('Shot', json, 'shotName');
    checkJsonMissesProperty('Shot', json, 'characters', true);
    checkJsonMissesProperty('Shot', json, 'props', true);
    return new Shot(
      json.shotName,
      json.characters.map(c => CharacterInScene.fromJSON(c, characters)),
      json.props,
      json.location
    );
  }
}

CharacterInScene = class CharacterInScene {
  /*
  * @param name = id
  */
  constructor(character, costume) {
    this.character = character;
    this.costume = costume;
  }

  static fromJSON(json, characters) {
    checkJsonMissesProperty('CharacterInScene', json, 'character');
    checkJsonMissesProperty('CharacterInScene', json, 'costume');
    return new CharacterInScene(
      characters.find(c => c.characterName === json.character),
      json.costume
    );
  }
}

Character = class Character {
  /*
  * @param name = id
  */
  constructor(characterName, person) {
    this.characterName = characterName;
    this.person = person;
  }

  static fromJSON(json, people) {
    checkJsonMissesProperty('Character', json, 'characterName');
    checkJsonMissesProperty('Character', json, 'person');
    return new Character(
      json.characterName,
      people.find(p => p.name === json.person)
    );
  }
}

Person = class Person {
  /*
  * @param name = id
  */
  constructor(name) {
    this.name = name;
  }

  static fromJSON(json) {
    checkJsonMissesProperty('Person', json, 'name');
    return new Person(json.name);
  }
}

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
