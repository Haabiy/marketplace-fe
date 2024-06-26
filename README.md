# SourceForm Component

## Description

The `SourceForm` component is a React functional component that provides a form for users to submit new data sources. It includes various fields for user input, handles form state, and submits the form data to a specified API endpoint.

## Features

- **Form Fields**: Includes fields for `created_by`, `country`, `data_vendor`, `panel`, `panel_group`, `scope_of_subscription`, `data_type`, `granularity`, `end_date`, `current_update`, `next_update`, and `data_upload`.
- **State Management**: Uses React's `useState` hook to manage form data and visibility.
- **File Upload**: Supports file uploads for the `data_upload` field.
- **Form Submission**: Submits form data to the API endpoint `http://localhost:8000/api/add-source/`.

## Usage

### State Initialization

```javascript
const [formData, setFormData] = useState({
  created_by: '',
  country: '',
  data_vendor: '',
  panel: '',
  panel_group: '',
  scope_of_subscription: '',
  data_type: '',
  granularity: 'national',
  end_date: null,
  current_update: null,
  next_update: null,
  data_upload: null,
});

const [showForm, setShowForm] = useState(false);
```

### Event Handlers

- **handleChange**: Updates the form state for text input fields.

```javascript
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};
```

- Example

```javascript
let form_data = {
    username: '',
    email: '',
    password: ''
};

console.log(form_data);

function testfunction(data, name, value){
    // data[name] = value;
    // return data;
    return {...data,
    [name]:value}
};

console.log(testfunction(form_data, 'username', 'abiy'));

```

We can also do it this way : 

```javascript
  const handleChange = (e) => {
  const { name, value } = e.target;
  const testform = {...formData}
  testform[name] = value
  setFormData(testform)
  //setFormData({ ...formData, [name]: value });
  console.log({ ...testform, [name]: value });
  //setFormData(form[name]:value)
};
```
#### NB: React States are IMMUTABLE. Meaning, we can't modify the original state object. We can't use the following.

```javascript 
  const handleChange = (e) => {
  const { name, value } = e.target;
  formData[name] = value
  setFormData(formData)
  console.log({ ...formData, [name]: value });
};
```

- **handleFileChange**: Updates the form state for file input fields.

```javascript
const handleFileChange = (e) => {
  setFormData({ ...formData, data_upload: e.target.files[0] });
};
```

- **handleSubmit**: Handles form submission, constructs a `FormData` object, and sends it to the API.

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formPayload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        formPayload.append(key, formData[key]);
      }
    });

    const response = await axios.post('http://localhost:8000/api/add-source/', formPayload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Server response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

- **toggleForm**: Toggles the visibility of the form.

```javascript
const toggleForm = () => {
  setShowForm(!showForm);
};
```
--

# Scrollable Form in Modal

This document outlines the changes made to add scroll functionality to a form within a modal.

## Changes Made

### Before
The form content was not scrollable, which could lead to issues on smaller screens where the form might overflow and become inaccessible.

```jsx
<div className="p-6">
  <form onSubmit={handleSubmit} className="space-y-4">
    {/* Form inputs */}
    <!-- rest of the form inputs -->
  </form>
</div>
```

### After
A wrapper div with `max-h-[60vh]` and `overflow-y-auto` was added to make the form content scrollable.

```jsx
<div className="p-6 max-h-[60vh] overflow-y-auto">
  <form onSubmit={handleSubmit} className="space-y-4">
    {/* Form inputs */}
    <!-- rest of the form inputs -->
  </form>
</div>
```