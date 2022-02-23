import axios from 'axios';

const ver = '1';

const controllerName = 'datatypes';

const baseUrl = `https://192.168.2.169:5001/api/v${ver}/${controllerName}`;


export class DataTypeApi {
  async getAll() {
    try {
      const res = await axios({
        method: 'GET',
        url: baseUrl,
        timeout: 15000,
      });
  
      return res;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async add(data) {
    try {
      const res = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        url: baseUrl,
        data,
        timeout: 15000,
      });
      return res;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getById(id) {
    try {
      const res = await axios({
        method: 'GET',
        url: `${baseUrl}/${id}`,
        timeout: 15000,
      });
      return res;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async update(id, data) {
    try {
      const res = await axios({
        method: 'PUT',
        url: `${baseUrl}/${id}`,
        data,
        timeout: 15000,
      });
      return res;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async delete(id) {
    try {
      const res = await axios({
        method: 'DELETE',
        url: `${baseUrl}/${id}`,
        timeout: 15000,
      });
      return res;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
