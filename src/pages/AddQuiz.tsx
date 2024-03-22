import { ContentHeader } from "@app/components";
import API from "@app/utils/API";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddQuiz = () => {
    const [question, setQuestion] = useState<File>();
    const [answer, setAnswer] = useState("");
    const option: string[] = [];
    const navigate = useNavigate();

    async function addQuiz() {
        try {
            await API.post('quiz', {
                question: question,
                answer: answer,
                option: option
            });
            navigate('/quiz');
        } catch (error) {
            console.log(error)
        }    
    }

    return (
        <div>
          <ContentHeader title="Quiz" />
          <section className="content">
            <div className="container-fluid">
              <div className="card">
                <div className="card-header">
                  <button onClick={() => navigate('/')} className="btn btn-primary">Home</button>
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
                <div className="card-body" style={{ height: '100vh' }}>
                        <form onSubmit={addQuiz}>
                            <label className="form-label">Question</label>
                            <input className="form-control mb-3" type="file" onChange={(e) => setQuestion(e.target.files![0])} />
                            <label className="form-label">Answer</label>
                            <input className="form-control mb-3" onChange={(e) => setAnswer(e.target.value)}/>
                            <label className="form-label">Option1</label>
                            <input className="form-control mb-3" onChange={(e) => option[0] = e.target.value}/>
                            <label className="form-label">Option2</label>
                            <input className="form-control mb-3" onChange={(e) => option[1] = e.target.value}/>
                            <label className="form-label">Option3</label>
                            <input className="form-control mb-3" onChange={(e) => option[2] = e.target.value}/>
                            <label className="form-label">Option4</label>
                            <input className="form-control mb-3" onChange={(e) => option[3] = e.target.value}/>
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

export default AddQuiz