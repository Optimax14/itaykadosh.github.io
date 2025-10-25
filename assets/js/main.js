
async function loadJSON(path){
  const res = await fetch(path);
  return await res.json();
}
function renderProjects(list, el){
  el.innerHTML = '<div class="grid">' + list.map(p=>`
    <article class="card">
      <h3>${p.title}</h3>
      <div class="badges">${(p.tags||[]).map(t=>`<span class="badge">${t}</span>`).join('')}</div>
      <p>${p.description||''}</p>
      <p>
        ${p.link?`<a href="${p.link}" target="_blank">Page</a>`:''}
        ${p.code?` · <a href="${p.code}" target="_blank">Code</a>`:''}
        ${p.pdf?` · <a href="${p.pdf}" target="_blank">PDF</a>`:''}
      </p>
    </article>
  `).join('') + '</div>';
}
function renderList(list, el){
  el.innerHTML = list.map(x=>`
    <div class="item">
      <div class="meta">${x.when || ''}${x.venue?` — ${x.venue}`:''}</div>
      <div><strong>${x.title}</strong>${x.authors?` — ${x.authors}`:''}</div>
      <div>${x.note || ''}</div>
      <div>${x.links? x.links.map(l=>`<a href="${l.url}" target="_blank">${l.label}</a>`).join(' · '): ''}</div>
    </div>
  `).join('');
}
