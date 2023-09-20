# Homework for lesson "7. Working with HTTP"

![CI](https://github.com/ElenaKars/ahj-7.1-helpDesk/actions/workflows/web.yml/badge.svg)

Rules for submitting the assignment:

1. **Important**: within this DP you need to use npm (which means there should not be any `yarn.lock` in the repository)
1. Frontend must be assembled via Webpack (including images and styles) and uploaded to Github Pages via Appveyor
1. README.md must contain a build badge and a link to Github Pages
1. As a result, send the reviewer links to the GitHub repository
1. There is no need to write auto-tests

**Important**: in this remote control you will need to complete a mini-project. We understand that it may take a little more time than regular remote control, but the topic of HTTP is so important that it is worth spending a little more time on it.

---

### HelpDesk

#### Legend

The backend developer has returned from vacation, so there is no need to write an API prototype for the application management service, it is ready.

#### Description

Description of the API. To store data we will operate with the following structures:
```javascript
Ticket {
     id // identifier (unique within the system)
     name // brief description
     status // boolean - done or not
     description // full description
     created // creation date (timestamp)
}
```

Example requests:
* `GET ?method=allTickets` - list of tickets
* `GET ?method=ticketById&id=<id>` - full description of the ticket (where `<id>` is the ticket identifier)
* `POST ?method=createTicket` - creating a ticket (`<id>` is generated on the server, in the body of the form `name`, `description`, `status`)

Respectively:
* `POST ?method=createTicket` - in the body of the request there is a form with fields for an object of type `Ticket` (with `id` = `null`)
* `POST ?method=updateById&id=<id>` - in the body of the request there is a form with fields for updating an object of type `Ticket` by `id`
* `GET ?method=allTickets` - an array of objects of type `Ticket` (i.e. without `description`)
* `GET ?method=ticketById&id=<id>` - object of type `Ticket`
* `GET ?method=deleteById&id=<id>` - delete an object of type `Ticket` by `id`, if the request is successful, the response status is 204

The code below will process the received response from the server in Frontend:
```js
xhr.addEventListener('load', () => {
     if (xhr.status >= 200 && xhr.status < 300) {
         try {
             const data = JSON.parse(xhr.responseText);
         } catch (e) {
             console.error(e);
         }
     }
});
```