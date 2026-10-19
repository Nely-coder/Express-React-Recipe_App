import ReactMarkdown from "react-markdown";

export default function GeminiRecipe(props) {
  return (
    <section className="suggested-recipe-container" aria-live="polite">
      <h2>Chef Gemini Recommends:</h2>
      <ReactMarkdown>{props.response}</ReactMarkdown>
    </section>
  );
}

// export default function ClaudeRecipe({ response }) {
//   return (
//     <section className="suggested-recipe-container">
//       <div className="recipe-heading">
//         <span className="recipe-icon" aria-hidden="true">
//
//         </span>
//         <div>
//           <p className="recipe-eyebrow">YOUR AI-GENERATED MEAL</p>
//           <h2>Chef Gemini Recommends</h2>
//         </div>
//       </div>

//       <article className="recipe-content">
//         <ReactMarkdown>{response}</ReactMarkdown>
//       </article>
//     </section>
//   );
// }
