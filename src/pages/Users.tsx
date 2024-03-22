import API from '@app/utils/API';
import { ContentHeader } from '@components';
import { useEffect, useState } from 'react';

interface IUser {
    _id: string;
    email: string;
    username: string | null;
    avatar: string | null;
    diamond: number;
    score: number;
    created_at: Date;
    updated_at: Date;
}

const Users = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    async function getUsers() {
        const response = await API.get('user');
        setUsers(response.data);
    }
    
    async function deleteUser(id: string) {
        if (!confirm('Are you sure you want to delete this user?')) {
            return false;
        }
        await API.delete(`user/${id}`);
        getUsers();
    }

    useEffect(() => {
        getUsers();
    }, [])

  return (
    <div>
      <ContentHeader title="Users" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Users</h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="collapse"
                  data-toggle="tooltip"
                  title="Collapse"
                >
                  <i className="fa fa-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="remove"
                  data-toggle="tooltip"
                  title="Remove"
                >
                  <i className="fa fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body">
            {!users ? null : users.map((user, index) => (
                <div className="d-flex flex-row card bg-secondary-emphasis pt-2" key={index}>
                    <div className='mx-4'>
                        <p>{index + 1}</p>
                    </div>
                    <div>
                        <img src={!user.avatar ? 'public/img/default-profile.png' : user.avatar} alt='avatar' className='rounded-circle' style={{ width: 100, height: 100, margin: 15 }} />
                    </div>
                    <div className="d-flex flex-column flex-grow-1" style={{ marginLeft: 20 }}>
                        <h5>email: {user.email}</h5>
                        <h5>username: {!user.username ? '-' : user.username}</h5>
                        <h5>diamond: {user.diamond}</h5>
                        <div className="d-flex flex-row">
                            
                        </div>
                    </div>
                    <div className="d-flex flex-column" style={{ marginRight: 20 }}>
                        <button onClick={() => deleteUser(user._id)} className="btn btn-danger">Delete</button>
                    </div>
                </div>
                ))}
            </div>
            <div className="card-footer">Footer</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Users;
