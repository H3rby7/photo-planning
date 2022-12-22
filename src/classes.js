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

  static fromJSON(json) {
    if (!json.shotName) {
      throw `'${json}' must define 'shotName'`;
    }
    if (!json.characters) {
      throw `'${json}' must define 'characters[]'`;
    }
    if (!Array.isArray(json.characters)) {
      throw `'characters' must be an array, but is '${json.characters}'`;
    }
    if (!json.props) {
      throw `'${json}' must define 'props'.`;
    }
    if (!Array.isArray(json.props)) {
      throw `'props' must be an array, but is '${json.props}'`;
    }
    return Shot(
      json.shotName,
      json.characters.map(CharacterInScene.ffromJSON),
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

  static fromJSON(json) {
    if (!json.character || !json.costume) {
      throw `'${json}' is not a definition of a character in a scene.`;
    }
    return CharacterInScene(Character.fromJSON(json.character), json.costume);
  }
}

Character = class Character {
  /*
  * @param name = id
  */
  constructor(name, person) {
    this.name = name;
    this.person = person;
  }

  static fromJSON(json) {
    if (!json.name || !json.person) {
      throw `'${json}' is not a character`;
    }
    return Character(json.name, Person.fromJSON(json.person));
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
    if (!json.name) {
      throw `'${json}' is not a person`;
    }
    return Person(json.name);
  }
}
