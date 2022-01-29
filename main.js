class Bears {
    constructor(name) {
        this.name = name
        this.room = null
    }

    send(message, to) {
        this.room.send(message, this, to)
    }

    receive(message, from) {
        console.log(`${from.name} => ${this.name} : ${message}`)
    }
}

class ChatRoom {
    constructor() {
        this.bears = {}
    }

    register(bear) {
        this.bears[bear.name] = bear
        bear.room = this
    }

    send(message, from, to) {
        if(to) {
            to.receive(message, from)
        } else {
            Object.keys(this.bears).forEach(key => {
                if(this.bears[key] !== from) {
                    this.bears[key].receive(message, from)
                }
            })
        }
    }
}
const rose = new Bears('Rose')
const billy = new Bears('Billy')
const jack = new Bears('Jack')

const room = new ChatRoom()

room.register(jack)
room.register(billy)
room.register(rose)

function sendMessages (from, to) {
    if (from === jack && to === rose) {
        return `${jack.send('Hello,Rose, i love you!', rose)}`,
               `${rose.send('I am sorry Billy, but I love someone else', billy)}`,
               `${billy.send('Oh God I am running away', rose)}`
    } else {
        console.log('Everything good!')
    }
}

sendMessages(jack, rose)
