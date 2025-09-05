import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../styles/customers.css';

const AddCustomerForm = ({ onSuccess }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      dept: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Required')
        .min(2, 'Must be at least 2 characters'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      dept: Yup.string()
        .required('Required')
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await axios.post('/customers', values);
        resetForm();
        onSuccess();
      } catch (error) {
        console.error('Error adding customer:', error);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="add-customer-form">
      <h2>Add New Customer</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...formik.getFieldProps('name')}
            className={formik.touched.name && formik.errors.name ? 'error' : ''}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error-message">{formik.errors.name}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...formik.getFieldProps('email')}
            className={formik.touched.email && formik.errors.email ? 'error' : ''}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error-message">{formik.errors.email}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="dept">Department</label>
          <input
            id="dept"
            type="text"
            {...formik.getFieldProps('dept')}
            className={formik.touched.dept && formik.errors.dept ? 'error' : ''}
          />
          {formik.touched.dept && formik.errors.dept && (
            <div className="error-message">{formik.errors.dept}</div>
          )}
        </div>

        <button 
          type="submit" 
          disabled={formik.isSubmitting}
          className="submit-button"
        >
          {formik.isSubmitting ? 'Adding...' : 'Add Customer'}
        </button>
      </form>
    </div>
  );
};

export default AddCustomerForm;
