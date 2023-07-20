import './CircleProgressBar.css';

const CircleProgressBar = ({ percentage } : { percentage : number }) => {

    // const diameter = 47;
    const diameter = 37;
    const radius = diameter / 2;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = ((100 - percentage) / 100) * circumference;
  
    return (
        <div className='circle-progress-bar'>
            <svg className="circle-progress" width={ radius * 2 + 3 } height={ radius * 2 + 3 }>
                <circle
                    cx={ radius + 1.5 }
                    cy={ radius + 1.5 }
                    r={ radius }
                />
                <circle
                    cx={ radius + 1.5 }
                    cy={ radius + 1.5 }
                    r={ radius }
                    strokeDasharray={ circumference }
                    strokeDashoffset={ progressOffset }
                />
            </svg>
            {/* <label htmlFor="">26</label> */}
        </div>
    );

}

export default CircleProgressBar;