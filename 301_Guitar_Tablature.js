/*
 * Challenge #301 (Hard): Guitar Tablature
 * https://www.reddit.com/r/dailyprogrammer/comments/5rt1cj/20170203_challenge_301_hard_guitar_tablature
 * https://jsfiddle.net/7fg3ssc0/7/
 */
let first = 
`E|------------------------------------|
 B|------------------------------------|
 G|------------------------------------|
 D|--------------------------------0-0-|
 A|-2-0---0--2--2--2--0--0---0--2------|
 E|-----3------------------------------|`;

let second = 
`E|-----------------|-----------------|-----------------|-----------------|
 B|-----------------|-----------------|-----------------|-----------------|
 G|-7-7---7---------|-7-7---7---------|-------------7---|-----------------|
 D|---------9---7---|---------9---7---|-6-6---6-9-------|-6-6---6-9--12---|
 A|-----------------|-----------------|-----------------|-----------------|
 E|-----------------|-----------------|-----------------|-----------------|`;

const STANDARD_TUNING = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

class LinkedList {
  constructor(thingToCircle) {
    this.nodes = [];
    for (let i = 0; i < thingToCircle.length; i++) {
      this.nodes.push(new Node(thingToCircle[i], i===0));
    }

    for (let i = 0; i + 1 < this.nodes.length; i++) {
      this.nodes[i].setNext(this.nodes[i+1]);
    }

    this.nodes[this.nodes.length - 1].setNext(this.nodes[0]);
  }

  _findNode(nodeVal) {
    let ourNode = this.nodes[0];
    if (ourNode.key === nodeVal) {
      return ourNode;
    }
    while (ourNode = ourNode.getNext()) {
      if (ourNode.key === nodeVal) {
        return ourNode;
      }
    }
  }

  getNote(startNode, distance) {
    let node = this._findNode(startNode);
    for (let i = distance; i > 0; i--) {
      node = node.getNext();
    }
    return node.key;
  }
}

class Node {
  constructor(key, isHead = false) {
    this.key = key;
    this.next = null;
    this.isHead = false;
  }

  setNext(node) {
    this.next = node;
  }

  getNext() {
    return this.next;
  }
}

class GuitarString {
  constructor(tabLine) {
    this.note = tabLine.slice(0, 1);
    this.line = tabLine.slice(2, tabLine.length-1);
    this.pos = 0;
  }

  isNextDouble() {
    return !isNaN(this.line[this.pos]) && !isNaN(this.line[this.pos + 1]);
  }

  getNext(useDouble = false) {
    let next = this.line[this.pos++];
    if (useDouble) {
      next = next + this.line[this.pos++];
    }
    return next;
  }

}

class TabToChord {
  constructor(notes = STANDARD_TUNING) {
    this.list = new LinkedList(notes);
  }

  convertTabs(tabString) {
    let strings = tabString.split('\n').map(gString => new GuitarString(gString.trim())),
    ret = [];

    for (let i = 0; i < strings[0].line.length; i++) {
      let useDouble = !!strings.map(s => s.isNextDouble()).filter(x => !!x).length;
      strings.forEach(s => {
        let current = s.getNext(useDouble);
        if (!isNaN(current)) {
          let note = this.list.getNote(s.note, current);
          if (note) {
            ret.push(note);
          }
        }
      })
    }

    return ret.join(' ');
  }
}
