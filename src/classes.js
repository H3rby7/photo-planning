Shot = class Shot {
  /*
  * @param {string} name = id
  * @param {string | null | 'greenscreen'} location = null, name of setting, or greenscreen
  */
  constructor(shotName, charactersInScene, props, location) {
    this.shotName = shotName;
    this.charactersInScene = charactersInScene;
    this.props = props;
    this.location = location;
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
}

Character = class Character {
  /*
  * @param name = id
  */
  constructor(name, person) {
    this.name = name;
    this.person = person;
  }
}

Person = class Person {
  /*
  * @param name = id
  */
  constructor(name) {
    this.name = name;
  }
}
