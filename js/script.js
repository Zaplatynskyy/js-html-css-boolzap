const app = new Vue({
    el : '#root',
    data : {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent',
                    last : false
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di dargli da mangiare',
                    status: 'sent',
                    last : false
                },
                {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received',
                    last : true
                }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent',
                    last : false
                },
                {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received',
                    last : false
                },
                {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'received',
                    last : true
                }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received',
                    last : false
                },
                {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent',
                    last : false
                },
                {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received',
                    last : true
                }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent',
                    last : false
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received',
                    last : true
                }
                ],
            },
            {
                name: 'Francesco',
                avatar: '_5',
                visible: true,
                messages: [{
                    date: '10/10/2021 19:30:55',
                    message: 'Stai ancora lavorando al codice?',
                    status: 'received',
                    last : false
                },
                {
                    date: '10/10/2021 19:50:00',
                    message: 'Si, sto cercando di risolvere questo problema',
                    status: 'sent',
                    last : false
                },
                {
                    date: '10/10/2021 19:50:10',
                    message: 'Tu l\'hai risolto?',
                    status: 'sent',
                    last : true
                }
                ],
            },
            {
                name: 'Serena',
                avatar: '_6',
                visible: true,
                messages: [{
                    date: '14/07/2021 10:30:55',
                    message: 'Oi tanti auguri di compleanno!!',
                    status: 'received',
                    last : false
                },
                {
                    date: '14/07/2021 10:32:00',
                    message: 'Che si fa stasera?',
                    status: 'received',
                    last : true
                }
                ],
            },
            {
                name: 'Giacomo',
                avatar: '_7',
                visible: true,
                messages: [{
                    date: '29/11/2021 09:30:55',
                    message: 'Hola, ascolta ci vediamo il pomeriggio?',
                    status: 'sent',
                    last : false
                },
                {
                    date: '29/11/2021 09:50:00',
                    message: 'Non ci sono, domani va bene lo stesso?',
                    status: 'received',
                    last : false
                },
                {
                    date: '29/11/2021 09:55:55',
                    message: 'Va bene, ci vediamo alle 15?',
                    status: 'sent',
                    last : false
                },
                {
                    date: '29/11/2021 10:05:16',
                    message: 'Alle 15 va bene.',
                    status: 'received',
                    last : false
                },
                {
                    date: '29/11/2021 10:05:50',
                    message: 'Mi raccomando porta gli appunti',
                    status: 'received',
                    last : false
                },
                {
                    date: '29/11/2021 10:30:00',
                    message: 'Assolutamente, a domani allora!',
                    status: 'sent',
                    last : true
                },
                ],
            },
        ],

        counter : null,
        newUserMsg : '',
        insContact : '',
        string : '',
        lastMsgDate : ''
    },

    methods : {
        selectContact : function(i) {
            this.counter = i
        },

        sentMessage : function() {
            const data = dayjs().format('DD/MM/YYYY HH:mm:ss');
            this.contacts[this.counter].messages.push(
                {
                    date : data,
                    message : this.newUserMsg,
                    status : 'sent'
                }
            );
            this.newUserMsg = '';

            setTimeout(this.receveMessage, 3000);
        },

        receveMessage : function() {
            const data = dayjs().format('DD/MM/YYYY HH:mm:ss');
            this.contacts[this.counter].messages.push(
                {
                    date : data,
                    message : 'Ok',
                    status : 'recevied'
                }
            );
        },

        searchContact : function(i) {
            if( this.contacts[i].name.toLowerCase().includes(this.insContact.toLowerCase()) ) {
                return true
            } else {
                return false
            }
        },

        lastMessageDate : function(i) {
            const position = this.contacts[i].messages.length - 1;
            return this.contacts[i].messages[position].date
        },

        lastMessage : function(i) {
            const position = this.contacts[i].messages.length - 1;
            return this.contacts[i].messages[position].message
        },

        lastStatus : function(i) {
            const position = this.contacts[i].messages.length - 1;
            return this.contacts[i].messages[position].status
        }
    }
})

// Milestone 1
// ● Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e
// dall’interlocutore (bianco) assegnando due classi CSS diverse
// ● Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare
// nome e immagine di ogni contatto

// Milestone 2
// ● Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i
// messaggi relativi al contatto attivo all’interno del pannello della conversazione
// ● Click sul contatto mostra la conversazione del contatto cliccato

// Milestone 3
// ● Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando
// “enter” il testo viene aggiunto al thread sopra, come messaggio verde
// ● Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà
// un “ok” come risposta, che apparirà dopo 1 secondo.

// Milestone 4
// ● Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i
// contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo
// “mar” rimangono solo Marco e Martina)