class PersonApi {
    constructor() {
        this.persons = [];
        this.getAndSetFields();
    }

    getAndSetFields() {
        this.getGeneratedPersonFromApi();
        this.setFormFields();
    }

    getGeneratedPersonFromApi() {
        $.ajax({
            url: 'https://randomuser.me/api/',
            dataType: 'json',
            async: false,
            success: (data) => {
                this.data = data.results[0];
            }
        });
    }

    setFormFields() {
        $('#gender').val(this.data.gender);
        $('#picture').attr('src', this.data.picture.large);
        $('#name').val(`${this.data.name.title} ${this.data.name.first} ${this.data.name.last}`);
        $('#address').val(`${this.data.location.street} ${this.data.location.city}, ${this.data.location.state} ${this.data.location.postcode}`);
        $('#email').val(this.data.email);
        $('#dob').val(this.data.dob);
        $('#phone').val(this.data.phone);
    }

    addToPersonList() {
        this.persons.push(new Person(this.data));
        this.generateList();
        this.getAndSetFields();
    }

    generateList() {
        let table = '<table class="table">';
        table += `<tr>
                    <th>Picture</th>
                    <th>Gender</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                  </tr>`;

        for (let person of this.persons) {
            table += `
              <tr>
                 <td><img src="${person.getPicture()}" id="listPicture" class="img-circle pull-left" alt="Cinque Terre" width="304" height="236"></td>
                 <td>${person.getGender()}</td>
                 <td>${person.getName()}</td>
                 <td>${person.getPhone()}</td>
                 <td>${person.getEmail()}</td>
              </tr>
            `;
        }
        table += '</table>';
        $('#personList').html(table);
    }
}

class Person {
    constructor(person) {
        this.gender = person.gender;
        this.name = `${person.name.title} ${person.name.first} ${person.name.last}`;
        this.picture = person.picture.large;
        this.email = person.email;
        this.phone = person.phone;
    }

    getGender () {
        return this.gender;
    }

    getName() {
        return this.name;
    }

    getPicture() {
        return this.picture;
    }

    getEmail() {
        return this.email;
    }

    getPhone() {
        return this.phone;
    }
}

let personApi = new PersonApi();

$('#generate').on('click', function () {
    personApi.getAndSetFields();
})

$('#likePerson').on('click', function () {    
    personApi.addToPersonList();
})