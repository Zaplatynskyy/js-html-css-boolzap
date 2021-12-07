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
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di dargli da mangiare',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received'
                    
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
                    status: 'sent'
                },
                {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                },
                {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'received'
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
                    status: 'received'
                },
                {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                },
                {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received'
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
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received'
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
                    status: 'received'
                },
                {
                    date: '10/10/2021 19:50:00',
                    message: 'Si, sto cercando di risolvere questo problema',
                    status: 'sent'
                },
                {
                    date: '10/10/2021 19:50:10',
                    message: 'Tu l\'hai risolto?',
                    status: 'sent'
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
                    status: 'received'
                },
                {
                    date: '14/07/2021 10:32:00',
                    message: 'Che si fa stasera?',
                    status: 'received'
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
                    status: 'sent'
                },
                {
                    date: '29/11/2021 09:50:00',
                    message: 'Non ci sono, domani va bene lo stesso?',
                    status: 'received'
                },
                {
                    date: '29/11/2021 09:55:55',
                    message: 'Va bene, ci vediamo alle 15?',
                    status: 'sent'
                },
                {
                    date: '29/11/2021 10:05:16',
                    message: 'Alle 15 va bene.',
                    status: 'received'
                },
                {
                    date: '29/11/2021 10:05:50',
                    message: 'Mi raccomando porta gli appunti',
                    status: 'received'
                },
                {
                    date: '29/11/2021 10:30:00',
                    message: 'Assolutamente, a domani allora!',
                    status: 'sent'
                },
                ],
            },
        ],

        counter : null,
        newUserMsg : '',
        insContact : '',
        lastMsgDate : '',
        popUp : {
            index : null,
            position : null,
            setting : false
        }
    },

    methods : {
        // funzione che assegna l'indice al valore counter che porterà quindi la posizione dell'elemento selezionato
        selectContact : function(i) {
            this.counter = i;
        },

        // funzione di invio messaggio inserito in input con la relativa data ed ora di invio, contenuto in un oggetto che pusceremo nell'array nell'apposita area
        sentMessage : function() {
            const data = dayjs().format("DD/MM/YYYY HH:mm:ss");
            this.contacts[this.counter].messages.push(
                {
                    date : data,
                    message : this.newUserMsg,
                    status : 'sent',
                    setting : false
                }
            );
            this.newUserMsg = '';
            
            // dopo 3 secondi richiama la funzione utente pc risponde
            setTimeout(this.receveMessage, 3000);
        },

        // funzione di ricevi messaggio automatico dal pc con la relativa data ed ora di invio, contenuto in un oggetto che pusceremo nell'array nell'apposita area
        receveMessage : function() {
            const data = dayjs().format("DD/MM/YYYY HH:mm:ss");
            this.contacts[this.counter].messages.push(
                {
                    date : data,
                    message : 'Ok',
                    status : 'received',
                    setting : false
                }
            );
        },

        // funzione di controllo se le lettere/nome inserite/o corrisponde ai nomi nella la lista dei contatti
        searchContact : function(i) {
            if( this.contacts[i].name.toLowerCase().includes(this.insContact.toLowerCase()) ) {
                return true
            } else {
                return false
            }
        },

        // funzione che restituisce la data dell'ultimo messaggio ricevuto/inviato 
        lastMessageDate : function(i) {
            if(this.contacts[i].messages.length >= 1) {
                dayjs.extend(dayjs_plugin_customParseFormat);
                const position = this.contacts[i].messages.length - 1;
                let date = this.contacts[i].messages[position].date;
                
                date = dayjs(date, "DD/MM/YYYY hh:mm:ss").format('DD/MM/YYYY');
                
                return date
            }
        },

        // funzione che restituisce l'ultimo messaggio ricevuto/inviato
        lastMessage : function(i) {
            if (this.contacts[i].messages.length >= 1) {
                const position = this.contacts[i].messages.length - 1;
                return this.contacts[i].messages[position].message
            }
            
        },

        // funzione che restituisce lo status(sent/recevied) dell'ultimo messaggio
        lastStatus : function(i) {
            if (this.contacts[i].messages.length >= 1) {
                const position = this.contacts[i].messages.length - 1;
                return this.contacts[i].messages[position].status
            }
        },

        // funzioneche restituisce l'orario di invio/ricevuta messaggio
        dateInHours : function(array) {
            dayjs.extend(dayjs_plugin_customParseFormat);
            let date = array.date;
            
            date = dayjs(date, "DD/MM/YYYY HH:mm:ss").format('HH:mm');
            return date
        },

        // // funzione che elimina il messaggio selezionato
        deleteMessage : function(counter, i) {
            this.contacts[counter].messages.splice(i, 1);

            this.popUp = {
                index : null,
                position : null,
                setting : false
            }
        },

        popUpping : function (i,counter) {
            if(i == this.popUp.index) {
                this.popUp = {
                    setting : !this.popUp.setting
                }
            } else {
                this.popUp = {
                    index : i,
                    position : counter,
                    setting : true
                }
            }
        }
    }
})

// popUp : {
//     index : null,
//     position : null,
//     setting : false
// }
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