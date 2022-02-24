/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import * as auth from '../redux/AuthRedux'
import {login} from '../redux/AuthCRUD'

const loginSchema = Yup.object().shape({
  userName: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  userName: 'admin',
  password: 'Tandan@123',
}

export function Login() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      login(values.userName, values.password)
        .then((data) => {
          let accessToken = data.data.data.token
          setLoading(false)
          dispatch(auth.actions.login(accessToken))
        })
        .catch(() => {
          setLoading(false)
          setSubmitting(false)
          setStatus('The login detail is incorrect')
        })
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>Đăng nhập hệ thống</h1>
        <div className='text-gray-400 fw-bold fs-4'>
          Bạn chưa có tài khoản?{' '}
          <Link to='/auth/registration' className='link-primary fw-bolder'>
            Tạo tài khoản mới
          </Link>
        </div>
      </div>
      {/* begin::Heading */}

      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : (
        <div></div>
      )}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>Tài khoản</label>
        <input
          placeholder='Tên đăng nhập'
          {...formik.getFieldProps('userName')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.userName && formik.errors.userName},
            {
              'is-valid': formik.touched.userName && !formik.errors.userName,
            }
          )}
          name='userName'
          autoComplete='off'
        />
        {formik.touched.userName && formik.errors.userName && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.userName}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            {/* begin::Label */}
            <label className='form-label fw-bolder text-dark fs-6 mb-0'>Mật khẩu</label>
            {/* end::Label */}
            {/* begin::Link */}
            <Link
              to='/auth/forgot-password'
              className='link-primary fs-6 fw-bolder'
              style={{marginLeft: '5px'}}
            >
              Quên mật khẩu ?
            </Link>
            {/* end::Link */}
          </div>
        </div>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Action */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Đăng nhập</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Đang xử lý...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}
    </form>
  )
}
