import { ContentHeader } from "@app/components";
import API from "@app/utils/API";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddAvatar = () => {
    const [image, setImage] = useState<File>();
    const [price, setPrice] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const navigate = useNavigate();

    async function addAvatar() {
        try {
            await API.post('avatar', {
                image,
                price,
                isLocked,
                eqquiped: false
            });
            navigate('/avatar');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
          <ContentHeader title="Avatar" />
          <section className="content">
            <div className="container-fluid">
              <div className="card">
                <div className="card-header">
                  <button className="btn btn-primary" onClick={() => navigate('/')}>Home</button>
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
                <div className="card-body" style={{ height: 400 }}>
                    <form onSubmit={addAvatar}>
                        <label className="form-label">Image</label>
                        <input className="form-control mb-3" type="file" onChange={(e) => setImage(e.target.files![0])} />
                        <label className="form-label">Price</label>
                        <input className="form-control mb-3" type ="number" onChange={(e) => setPrice(Number(e.target.value))}/>
                        <label className="form-label">isLocked</label>
                        <input className="form-control mb-3 justify-content-start" type="checkbox" onChange={(e) => setIsLocked(e.target.checked)} />
                        <div>
                            <button type="submit" className="btn btn-primary" style={{ marginRight: 10 }}>Submit</button>
                            <button type="button" className="btn btn-danger" onClick={() => navigate('/quiz')}>Back</button>
                        </div>
                    </form>
                </div>
                <div className="card-footer">Footer</div>
              </div>
            </div>
          </section>
        </div>
    );
}

export default AddAvatar