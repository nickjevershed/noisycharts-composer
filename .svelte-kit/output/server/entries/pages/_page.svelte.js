import { b as set_current_component, r as run_all, d as current_component, c as create_ssr_component, f as compute_rest_props, h as spread, i as escape_attribute_value, j as escape_object, e as escape, g as getContext, v as validate_component, k as add_attribute, l as add_classes, m as missing_component, n as compute_slots, o as createEventDispatcher, a as subscribe, s as setContext, p as add_styles, q as each } from "../../chunks/ssr.js";
import "newsroom-dojo";
import * as d3 from "d3";
import "papaparse";
import "tone";
import { d as derived, w as writable } from "../../chunks/index.js";
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length) binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
const ButtonSkeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "size"]);
  let { href = void 0 } = $$props;
  let { size = "default" } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  return ` ${href ? `<a${spread(
    [
      { href: escape_attribute_value(href) },
      {
        rel: escape_attribute_value($$restProps.target === "_blank" ? "noopener noreferrer" : void 0)
      },
      { role: "button" },
      escape_object($$restProps)
    ],
    {
      classes: "bx--skeleton bx--btn " + (size === "field" ? "bx--btn--field" : "") + " " + (size === "small" ? "bx--btn--sm" : "") + " " + (size === "lg" ? "bx--btn--lg" : "") + " " + (size === "xl" ? "bx--btn--xl" : "")
    }
  )}>${escape("")}</a>` : ` <div${spread([escape_object($$restProps)], {
    classes: "bx--skeleton bx--btn " + (size === "field" ? "bx--btn--field" : "") + " " + (size === "small" ? "bx--btn--sm" : "") + " " + (size === "lg" ? "bx--btn--lg" : "") + " " + (size === "xl" ? "bx--btn--xl" : "")
  })}></div>`}`;
});
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let hasIconOnly;
  let iconProps;
  let buttonProps;
  let $$restProps = compute_rest_props($$props, [
    "kind",
    "size",
    "expressive",
    "isSelected",
    "icon",
    "iconDescription",
    "tooltipAlignment",
    "tooltipPosition",
    "as",
    "skeleton",
    "disabled",
    "href",
    "tabindex",
    "type",
    "ref"
  ]);
  let $$slots = compute_slots(slots);
  let { kind = "primary" } = $$props;
  let { size = "default" } = $$props;
  let { expressive = false } = $$props;
  let { isSelected = false } = $$props;
  let { icon = void 0 } = $$props;
  let { iconDescription = void 0 } = $$props;
  let { tooltipAlignment = "center" } = $$props;
  let { tooltipPosition = "bottom" } = $$props;
  let { as = false } = $$props;
  let { skeleton = false } = $$props;
  let { disabled = false } = $$props;
  let { href = void 0 } = $$props;
  let { tabindex = "0" } = $$props;
  let { type = "button" } = $$props;
  let { ref = null } = $$props;
  const ctx = getContext("ComposedModal");
  if ($$props.kind === void 0 && $$bindings.kind && kind !== void 0) $$bindings.kind(kind);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.expressive === void 0 && $$bindings.expressive && expressive !== void 0) $$bindings.expressive(expressive);
  if ($$props.isSelected === void 0 && $$bindings.isSelected && isSelected !== void 0) $$bindings.isSelected(isSelected);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0) $$bindings.iconDescription(iconDescription);
  if ($$props.tooltipAlignment === void 0 && $$bindings.tooltipAlignment && tooltipAlignment !== void 0) $$bindings.tooltipAlignment(tooltipAlignment);
  if ($$props.tooltipPosition === void 0 && $$bindings.tooltipPosition && tooltipPosition !== void 0) $$bindings.tooltipPosition(tooltipPosition);
  if ($$props.as === void 0 && $$bindings.as && as !== void 0) $$bindings.as(as);
  if ($$props.skeleton === void 0 && $$bindings.skeleton && skeleton !== void 0) $$bindings.skeleton(skeleton);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0) $$bindings.tabindex(tabindex);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  {
    if (ctx && ref) {
      ctx.declareRef(ref);
    }
  }
  hasIconOnly = (icon || $$slots.icon) && !$$slots.default;
  iconProps = {
    "aria-hidden": "true",
    class: "bx--btn__icon",
    "aria-label": iconDescription
  };
  buttonProps = {
    type: href && !disabled ? void 0 : type,
    tabindex,
    disabled: disabled === true ? true : void 0,
    href,
    "aria-pressed": hasIconOnly && kind === "ghost" && !href ? isSelected : void 0,
    ...$$restProps,
    class: [
      "bx--btn",
      expressive && "bx--btn--expressive",
      (size === "small" && !expressive || size === "sm" && !expressive || size === "small" && !expressive) && "bx--btn--sm",
      size === "field" && !expressive || size === "md" && !expressive && "bx--btn--md",
      size === "field" && "bx--btn--field",
      size === "small" && "bx--btn--sm",
      size === "lg" && "bx--btn--lg",
      size === "xl" && "bx--btn--xl",
      kind && `bx--btn--${kind}`,
      disabled && "bx--btn--disabled",
      hasIconOnly && "bx--btn--icon-only",
      hasIconOnly && "bx--tooltip__trigger",
      hasIconOnly && "bx--tooltip--a11y",
      hasIconOnly && tooltipPosition && `bx--btn--icon-only--${tooltipPosition}`,
      hasIconOnly && tooltipAlignment && `bx--tooltip--align-${tooltipAlignment}`,
      hasIconOnly && isSelected && kind === "ghost" && "bx--btn--selected",
      $$restProps.class
    ].filter(Boolean).join(" ")
  };
  return ` ${skeleton ? `${validate_component(ButtonSkeleton, "ButtonSkeleton").$$render($$result, Object.assign({}, { href }, { size }, $$restProps, { style: hasIconOnly && "width: 3rem;" }), {}, {})}` : `${as ? `${slots.default ? slots.default({ props: buttonProps }) : ``}` : `${href && !disabled ? `  <a${spread([escape_object(buttonProps)], {})}${add_attribute("this", ref, 0)}>${hasIconOnly ? `<span${add_classes("bx--assistive-text".trim())}>${escape(iconDescription)}</span>` : ``} ${slots.default ? slots.default({}) : ``} ${$$slots.icon ? `${slots.icon ? slots.icon({
    style: hasIconOnly ? "margin-left: 0" : void 0,
    ...iconProps
  }) : ``}` : `${icon ? `${validate_component(icon || missing_component, "svelte:component").$$render(
    $$result,
    Object.assign(
      {},
      {
        style: hasIconOnly ? "margin-left: 0" : void 0
      },
      iconProps
    ),
    {},
    {}
  )}` : ``}`}</a>` : `<button${spread([escape_object(buttonProps)], {})}${add_attribute("this", ref, 0)}>${hasIconOnly ? `<span${add_classes("bx--assistive-text".trim())}>${escape(iconDescription)}</span>` : ``} ${slots.default ? slots.default({}) : ``} ${$$slots.icon ? `${slots.icon ? slots.icon({
    style: hasIconOnly ? "margin-left: 0" : void 0,
    ...iconProps
  }) : ``}` : `${icon ? `${validate_component(icon || missing_component, "svelte:component").$$render(
    $$result,
    Object.assign(
      {},
      {
        style: hasIconOnly ? "margin-left: 0" : void 0
      },
      iconProps
    ),
    {},
    {}
  )}` : ``}`}</button>`}`}`}`;
});
const WarningFilled = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14C30,8.3,23.7,2,16,2z M14.9,8h2.2v11h-2.2V8z M16,25	c-0.8,0-1.5-0.7-1.5-1.5S15.2,22,16,22c0.8,0,1.5,0.7,1.5,1.5S16.8,25,16,25z"></path><path fill="none" d="M17.5,23.5c0,0.8-0.7,1.5-1.5,1.5c-0.8,0-1.5-0.7-1.5-1.5S15.2,22,16,22	C16.8,22,17.5,22.7,17.5,23.5z M17.1,8h-2.2v11h2.2V8z" data-icon-path="inner-path" opacity="0"></path></svg>`;
});
const WarningAltFilled = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path fill="none" d="M16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Zm-1.125-5h2.25V12h-2.25Z" data-icon-path="inner-path"></path><path d="M16.002,6.1714h-.004L4.6487,27.9966,4.6506,28H27.3494l.0019-.0034ZM14.875,12h2.25v9h-2.25ZM16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Z"></path><path d="M29,30H3a1,1,0,0,1-.8872-1.4614l13-25a1,1,0,0,1,1.7744,0l13,25A1,1,0,0,1,29,30ZM4.6507,28H27.3493l.002-.0033L16.002,6.1714h-.004L4.6487,27.9967Z"></path></svg>`;
});
const ChevronDown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M16 22L6 12 7.4 10.6 16 19.2 24.6 10.6 26 12z"></path></svg>`;
});
const Grid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let props;
  let $$restProps = compute_rest_props($$props, [
    "as",
    "condensed",
    "narrow",
    "fullWidth",
    "noGutter",
    "noGutterLeft",
    "noGutterRight",
    "padding"
  ]);
  let { as = false } = $$props;
  let { condensed = false } = $$props;
  let { narrow = false } = $$props;
  let { fullWidth = false } = $$props;
  let { noGutter = false } = $$props;
  let { noGutterLeft = false } = $$props;
  let { noGutterRight = false } = $$props;
  let { padding = false } = $$props;
  if ($$props.as === void 0 && $$bindings.as && as !== void 0) $$bindings.as(as);
  if ($$props.condensed === void 0 && $$bindings.condensed && condensed !== void 0) $$bindings.condensed(condensed);
  if ($$props.narrow === void 0 && $$bindings.narrow && narrow !== void 0) $$bindings.narrow(narrow);
  if ($$props.fullWidth === void 0 && $$bindings.fullWidth && fullWidth !== void 0) $$bindings.fullWidth(fullWidth);
  if ($$props.noGutter === void 0 && $$bindings.noGutter && noGutter !== void 0) $$bindings.noGutter(noGutter);
  if ($$props.noGutterLeft === void 0 && $$bindings.noGutterLeft && noGutterLeft !== void 0) $$bindings.noGutterLeft(noGutterLeft);
  if ($$props.noGutterRight === void 0 && $$bindings.noGutterRight && noGutterRight !== void 0) $$bindings.noGutterRight(noGutterRight);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0) $$bindings.padding(padding);
  props = {
    ...$$restProps,
    class: [
      $$restProps.class,
      "bx--grid",
      condensed && "bx--grid--condensed",
      narrow && "bx--grid--narrow",
      fullWidth && "bx--grid--full-width",
      noGutter && "bx--no-gutter",
      noGutterLeft && "bx--no-gutter--left",
      noGutterRight && "bx--no-gutter--right",
      padding && "bx--row-padding"
    ].filter(Boolean).join(" ")
  };
  return `${as ? `${slots.default ? slots.default({ props }) : ``}` : `<div${spread([escape_object(props)], {})}>${slots.default ? slots.default({}) : ``}</div>`}`;
});
const Row = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let props;
  let $$restProps = compute_rest_props($$props, ["as", "condensed", "narrow", "noGutter", "noGutterLeft", "noGutterRight", "padding"]);
  let { as = false } = $$props;
  let { condensed = false } = $$props;
  let { narrow = false } = $$props;
  let { noGutter = false } = $$props;
  let { noGutterLeft = false } = $$props;
  let { noGutterRight = false } = $$props;
  let { padding = false } = $$props;
  if ($$props.as === void 0 && $$bindings.as && as !== void 0) $$bindings.as(as);
  if ($$props.condensed === void 0 && $$bindings.condensed && condensed !== void 0) $$bindings.condensed(condensed);
  if ($$props.narrow === void 0 && $$bindings.narrow && narrow !== void 0) $$bindings.narrow(narrow);
  if ($$props.noGutter === void 0 && $$bindings.noGutter && noGutter !== void 0) $$bindings.noGutter(noGutter);
  if ($$props.noGutterLeft === void 0 && $$bindings.noGutterLeft && noGutterLeft !== void 0) $$bindings.noGutterLeft(noGutterLeft);
  if ($$props.noGutterRight === void 0 && $$bindings.noGutterRight && noGutterRight !== void 0) $$bindings.noGutterRight(noGutterRight);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0) $$bindings.padding(padding);
  props = {
    ...$$restProps,
    class: [
      $$restProps.class,
      "bx--row",
      condensed && "bx--row--condensed",
      narrow && "bx--row--narrow",
      noGutter && "bx--no-gutter",
      noGutterLeft && "bx--no-gutter--left",
      noGutterRight && "bx--no-gutter--right",
      padding && "bx--row-padding"
    ].filter(Boolean).join(" ")
  };
  return `${as ? `${slots.default ? slots.default({ props }) : ``}` : `<div${spread([escape_object(props)], {})}>${slots.default ? slots.default({}) : ``}</div>`}`;
});
const Column = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let columnClass;
  let props;
  let $$restProps = compute_rest_props($$props, [
    "as",
    "noGutter",
    "noGutterLeft",
    "noGutterRight",
    "padding",
    "aspectRatio",
    "sm",
    "md",
    "lg",
    "xlg",
    "max"
  ]);
  let { as = false } = $$props;
  let { noGutter = false } = $$props;
  let { noGutterLeft = false } = $$props;
  let { noGutterRight = false } = $$props;
  let { padding = false } = $$props;
  let { aspectRatio = void 0 } = $$props;
  let { sm = void 0 } = $$props;
  let { md = void 0 } = $$props;
  let { lg = void 0 } = $$props;
  let { xlg = void 0 } = $$props;
  let { max = void 0 } = $$props;
  const breakpoints = ["sm", "md", "lg", "xlg", "max"];
  if ($$props.as === void 0 && $$bindings.as && as !== void 0) $$bindings.as(as);
  if ($$props.noGutter === void 0 && $$bindings.noGutter && noGutter !== void 0) $$bindings.noGutter(noGutter);
  if ($$props.noGutterLeft === void 0 && $$bindings.noGutterLeft && noGutterLeft !== void 0) $$bindings.noGutterLeft(noGutterLeft);
  if ($$props.noGutterRight === void 0 && $$bindings.noGutterRight && noGutterRight !== void 0) $$bindings.noGutterRight(noGutterRight);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0) $$bindings.padding(padding);
  if ($$props.aspectRatio === void 0 && $$bindings.aspectRatio && aspectRatio !== void 0) $$bindings.aspectRatio(aspectRatio);
  if ($$props.sm === void 0 && $$bindings.sm && sm !== void 0) $$bindings.sm(sm);
  if ($$props.md === void 0 && $$bindings.md && md !== void 0) $$bindings.md(md);
  if ($$props.lg === void 0 && $$bindings.lg && lg !== void 0) $$bindings.lg(lg);
  if ($$props.xlg === void 0 && $$bindings.xlg && xlg !== void 0) $$bindings.xlg(xlg);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0) $$bindings.max(max);
  columnClass = [sm, md, lg, xlg, max].map((breakpoint, i) => {
    const name = breakpoints[i];
    if (breakpoint === true) {
      return `bx--col-${name}`;
    } else if (typeof breakpoint === "number") {
      return `bx--col-${name}-${breakpoint}`;
    } else if (typeof breakpoint === "object") {
      let bp = [];
      if (typeof breakpoint.span === "number") {
        bp = [...bp, `bx--col-${name}-${breakpoint.span}`];
      } else if (breakpoint.span === true) {
        bp = [...bp, `bx--col-${name}`];
      }
      if (typeof breakpoint.offset === "number") {
        bp = [...bp, `bx--offset-${name}-${breakpoint.offset}`];
      }
      return bp.join(" ");
    }
  }).filter(Boolean).join(" ");
  props = {
    ...$$restProps,
    class: [
      $$restProps.class,
      columnClass,
      !columnClass && "bx--col",
      noGutter && "bx--no-gutter",
      noGutterLeft && "bx--no-gutter--left",
      noGutterRight && "bx--no-gutter--right",
      aspectRatio && `bx--aspect-ratio bx--aspect-ratio--${aspectRatio}`,
      padding && "bx--col-padding"
    ].filter(Boolean).join(" ")
  };
  return `${as ? `${slots.default ? slots.default({ props }) : ``}` : `<div${spread([escape_object(props)], {})}>${slots.default ? slots.default({}) : ``}</div>`}`;
});
const EditOff = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M30 28.6L3.4 2 2 3.4l10.1 10.1L4 21.6V28h6.4l8.1-8.1L28.6 30 30 28.6zM9.6 26H6v-3.6l7.5-7.5 3.6 3.6L9.6 26zM29.4 6.2L29.4 6.2l-3.6-3.6c-.8-.8-2-.8-2.8 0l0 0 0 0-8 8 1.4 1.4L20 8.4l3.6 3.6L20 15.6l1.4 1.4 8-8C30.2 8.2 30.2 7 29.4 6.2L29.4 6.2zM25 10.6L21.4 7l3-3L28 7.6 25 10.6z"></path></svg>`;
});
const Tabs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentTab;
  let currentContent;
  let $$restProps = compute_rest_props($$props, ["selected", "type", "autoWidth", "iconDescription", "triggerHref"]);
  let $selectedTab, $$unsubscribe_selectedTab;
  let $content, $$unsubscribe_content;
  let $tabs, $$unsubscribe_tabs;
  let $tabsById, $$unsubscribe_tabsById;
  let { selected = 0 } = $$props;
  let { type = "default" } = $$props;
  let { autoWidth = false } = $$props;
  let { iconDescription = "Show menu options" } = $$props;
  let { triggerHref = "#" } = $$props;
  createEventDispatcher();
  const tabs = writable([]);
  $$unsubscribe_tabs = subscribe(tabs, (value) => $tabs = value);
  const tabsById = derived(tabs, (_) => _.reduce((a, c) => ({ ...a, [c.id]: c }), {}));
  $$unsubscribe_tabsById = subscribe(tabsById, (value) => $tabsById = value);
  const useAutoWidth = writable(autoWidth);
  const selectedTab = writable(void 0);
  $$unsubscribe_selectedTab = subscribe(selectedTab, (value) => $selectedTab = value);
  const content = writable([]);
  $$unsubscribe_content = subscribe(content, (value) => $content = value);
  const contentById = derived(content, (_) => _.reduce((a, c) => ({ ...a, [c.id]: c }), {}));
  const selectedContent = writable(void 0);
  let refTabList = null;
  setContext("Tabs", {
    tabs,
    contentById,
    selectedTab,
    selectedContent,
    useAutoWidth,
    add: (data) => {
      tabs.update((_) => [..._, { ...data, index: _.length }]);
    },
    addContent: (data) => {
      content.update((_) => [..._, { ...data, index: _.length }]);
    },
    update: (id) => {
      currentIndex = $tabsById[id].index;
    },
    change: async (direction) => {
      let index = currentIndex + direction;
      if (index < 0) {
        index = $tabs.length - 1;
      } else if (index >= $tabs.length) {
        index = 0;
      }
      let disabled = $tabs[index].disabled;
      while (disabled) {
        index = index + direction;
        if (index < 0) {
          index = $tabs.length - 1;
        } else if (index >= $tabs.length) {
          index = 0;
        }
        disabled = $tabs[index].disabled;
      }
      currentIndex = index;
      await tick();
    }
  });
  let dropdownHidden = true;
  let currentIndex = selected;
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0) $$bindings.selected(selected);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.autoWidth === void 0 && $$bindings.autoWidth && autoWidth !== void 0) $$bindings.autoWidth(autoWidth);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0) $$bindings.iconDescription(iconDescription);
  if ($$props.triggerHref === void 0 && $$bindings.triggerHref && triggerHref !== void 0) $$bindings.triggerHref(triggerHref);
  currentIndex = selected;
  currentTab = $tabs[currentIndex] || void 0;
  currentContent = $content[currentIndex] || void 0;
  {
    {
      if (currentTab) {
        selectedTab.set(currentTab.id);
      }
      if (currentContent) {
        selectedContent.set(currentContent.id);
      }
    }
  }
  {
    if ($selectedTab) {
      dropdownHidden = true;
    }
  }
  {
    useAutoWidth.set(autoWidth);
  }
  $$unsubscribe_selectedTab();
  $$unsubscribe_content();
  $$unsubscribe_tabs();
  $$unsubscribe_tabsById();
  return `<div${spread([{ role: "navigation" }, escape_object($$restProps)], {
    classes: "bx--tabs " + (type === "container" ? "bx--tabs--container" : "")
  })}><div role="listbox" tabindex="0"${add_attribute("aria-label", $$props["aria-label"] || "listbox", 0)}${add_classes("bx--tabs-trigger".trim())}><a tabindex="-1"${add_attribute("href", triggerHref, 0)}${add_classes("bx--tabs-trigger-text".trim())}>${currentTab ? `${escape(currentTab.label)}` : ``}</a> ${validate_component(ChevronDown, "ChevronDown").$$render(
    $$result,
    {
      "aria-hidden": "true",
      title: iconDescription
    },
    {},
    {}
  )}</div>  <ul role="tablist"${add_classes(("bx--tabs__nav " + (dropdownHidden ? "bx--tabs__nav--hidden" : "")).trim())}${add_attribute("this", refTabList, 0)}>${slots.default ? slots.default({}) : ``}</ul></div> ${slots.content ? slots.content({}) : ``}`;
});
const Tab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selected;
  let $$restProps = compute_rest_props($$props, ["label", "href", "disabled", "tabindex", "id", "ref"]);
  let $selectedTab, $$unsubscribe_selectedTab;
  let $useAutoWidth, $$unsubscribe_useAutoWidth;
  let { label = "" } = $$props;
  let { href = "#" } = $$props;
  let { disabled = false } = $$props;
  let { tabindex = "0" } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { ref = null } = $$props;
  const { selectedTab, useAutoWidth, add, update: update2, change } = getContext("Tabs");
  $$unsubscribe_selectedTab = subscribe(selectedTab, (value) => $selectedTab = value);
  $$unsubscribe_useAutoWidth = subscribe(useAutoWidth, (value) => $useAutoWidth = value);
  add({ id, label, disabled });
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0) $$bindings.tabindex(tabindex);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  selected = $selectedTab === id;
  $$unsubscribe_selectedTab();
  $$unsubscribe_useAutoWidth();
  return ` <li${spread([{ tabindex: "-1" }, { role: "presentation" }, escape_object($$restProps)], {
    classes: "bx--tabs__nav-item " + (disabled ? "bx--tabs__nav-item--disabled" : "") + " " + (selected ? "bx--tabs__nav-item--selected" : "")
  })}><a role="tab"${add_attribute("tabindex", disabled ? "-1" : tabindex, 0)}${add_attribute("aria-selected", selected, 0)}${add_attribute("aria-disabled", disabled, 0)}${add_attribute("id", id, 0)}${add_attribute("href", href, 0)}${add_classes("bx--tabs__nav-link".trim())}${add_styles({
    "width": $useAutoWidth ? "auto" : void 0
  })}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : `${escape(label)}`}</a></li>`;
});
const TabContent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selected;
  let index;
  let tabId;
  let $$restProps = compute_rest_props($$props, ["id"]);
  let $tabs, $$unsubscribe_tabs;
  let $contentById, $$unsubscribe_contentById;
  let $selectedContent, $$unsubscribe_selectedContent;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  const { selectedContent, addContent, tabs, contentById } = getContext("Tabs");
  $$unsubscribe_selectedContent = subscribe(selectedContent, (value) => $selectedContent = value);
  $$unsubscribe_tabs = subscribe(tabs, (value) => $tabs = value);
  $$unsubscribe_contentById = subscribe(contentById, (value) => $contentById = value);
  addContent({ id });
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  selected = $selectedContent === id;
  index = $contentById[id].index;
  tabId = $tabs[index].id;
  $$unsubscribe_tabs();
  $$unsubscribe_contentById();
  $$unsubscribe_selectedContent();
  return `<div${spread(
    [
      { role: "tabpanel" },
      {
        "aria-labelledby": escape_attribute_value(tabId)
      },
      {
        "aria-hidden": escape_attribute_value(!selected)
      },
      {
        hidden: (selected ? void 0 : "") || null
      },
      { id: escape_attribute_value(id) },
      escape_object($$restProps)
    ],
    { classes: "bx--tab-content" }
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const TextArea = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let errorId;
  let $$restProps = compute_rest_props($$props, [
    "value",
    "placeholder",
    "cols",
    "rows",
    "maxCount",
    "light",
    "disabled",
    "readonly",
    "helperText",
    "labelText",
    "hideLabel",
    "invalid",
    "invalidText",
    "id",
    "name",
    "ref"
  ]);
  let $$slots = compute_slots(slots);
  let { value = "" } = $$props;
  let { placeholder = "" } = $$props;
  let { cols = 50 } = $$props;
  let { rows = 4 } = $$props;
  let { maxCount = void 0 } = $$props;
  let { light = false } = $$props;
  let { disabled = false } = $$props;
  let { readonly = false } = $$props;
  let { helperText = "" } = $$props;
  let { labelText = "" } = $$props;
  let { hideLabel = false } = $$props;
  let { invalid = false } = $$props;
  let { invalidText = "" } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { name = void 0 } = $$props;
  let { ref = null } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  if ($$props.cols === void 0 && $$bindings.cols && cols !== void 0) $$bindings.cols(cols);
  if ($$props.rows === void 0 && $$bindings.rows && rows !== void 0) $$bindings.rows(rows);
  if ($$props.maxCount === void 0 && $$bindings.maxCount && maxCount !== void 0) $$bindings.maxCount(maxCount);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0) $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0) $$bindings.readonly(readonly);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0) $$bindings.helperText(helperText);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0) $$bindings.labelText(labelText);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0) $$bindings.hideLabel(hideLabel);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0) $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0) $$bindings.invalidText(invalidText);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  errorId = `error-${id}`;
  return `   <div${add_classes("bx--form-item".trim())}>${(labelText || $$slots.labelText) && !hideLabel ? `<div${add_classes("bx--text-area__label-wrapper".trim())}><label${add_attribute("for", id, 0)}${add_classes(("bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "")).trim())}>${slots.labelText ? slots.labelText({}) : ` ${escape(labelText)} `}</label> ${maxCount ? `<div${add_classes(("bx--label " + (disabled ? "bx--label--disabled" : "")).trim())}>${escape(value.length)}/${escape(maxCount)}</div>` : ``}</div>` : ``} <div${add_attribute("data-invalid", invalid || void 0, 0)}${add_classes("bx--text-area__wrapper".trim())}>${invalid ? `${validate_component(WarningFilled, "WarningFilled").$$render($$result, { class: "bx--text-area__invalid-icon" }, {}, {})}` : ``} <textarea${spread(
    [
      {
        "aria-invalid": escape_attribute_value(invalid || void 0)
      },
      {
        "aria-describedby": escape_attribute_value(invalid ? errorId : void 0)
      },
      { disabled: disabled || null },
      { id: escape_attribute_value(id) },
      { name: escape_attribute_value(name) },
      { cols: escape_attribute_value(cols) },
      { rows: escape_attribute_value(rows) },
      {
        placeholder: escape_attribute_value(placeholder)
      },
      { readonly: readonly || null },
      {
        maxlength: escape_attribute_value(maxCount ?? void 0)
      },
      escape_object($$restProps)
    ],
    {
      classes: "bx--text-area " + (light ? "bx--text-area--light" : "") + " " + (invalid ? "bx--text-area--invalid" : "")
    }
  )}${add_attribute("this", ref, 0)}>${escape(value || "")}</textarea></div> ${!invalid && helperText ? `<div${add_classes(("bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "")).trim())}>${escape(helperText)}</div>` : ``} ${invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes("bx--form-requirement".trim())}>${escape(invalidText)}</div>` : ``}</div>`;
});
const TextInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isFluid;
  let error;
  let helperId;
  let errorId;
  let warnId;
  let $$restProps = compute_rest_props($$props, [
    "size",
    "value",
    "placeholder",
    "light",
    "disabled",
    "helperText",
    "id",
    "name",
    "labelText",
    "hideLabel",
    "invalid",
    "invalidText",
    "warn",
    "warnText",
    "ref",
    "required",
    "inline",
    "readonly"
  ]);
  let $$slots = compute_slots(slots);
  let { size = void 0 } = $$props;
  let { value = "" } = $$props;
  let { placeholder = "" } = $$props;
  let { light = false } = $$props;
  let { disabled = false } = $$props;
  let { helperText = "" } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { name = void 0 } = $$props;
  let { labelText = "" } = $$props;
  let { hideLabel = false } = $$props;
  let { invalid = false } = $$props;
  let { invalidText = "" } = $$props;
  let { warn = false } = $$props;
  let { warnText = "" } = $$props;
  let { ref = null } = $$props;
  let { required = false } = $$props;
  let { inline = false } = $$props;
  let { readonly = false } = $$props;
  const ctx = getContext("Form");
  createEventDispatcher();
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0) $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0) $$bindings.helperText(helperText);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0) $$bindings.labelText(labelText);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0) $$bindings.hideLabel(hideLabel);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0) $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0) $$bindings.invalidText(invalidText);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0) $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0) $$bindings.warnText(warnText);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0) $$bindings.required(required);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0) $$bindings.inline(inline);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0) $$bindings.readonly(readonly);
  isFluid = !!ctx && ctx.isFluid;
  error = invalid && !readonly;
  helperId = `helper-${id}`;
  errorId = `error-${id}`;
  warnId = `warn-${id}`;
  return `   <div${add_classes(("bx--form-item bx--text-input-wrapper " + (inline ? "bx--text-input-wrapper--inline" : "") + " " + (light ? "bx--text-input-wrapper--light" : "") + " " + (readonly ? "bx--text-input-wrapper--readonly" : "")).trim())}>${inline ? `<div${add_classes("bx--text-input__label-helper-wrapper".trim())}>${labelText ? `<label${add_attribute("for", id, 0)}${add_classes(("bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "") + " " + (inline ? "bx--label--inline" : "") + " " + (size === "sm" ? "bx--label--inline--sm" : "") + " " + (size === "xl" ? "bx--label--inline--xl" : "")).trim())}>${slots.labelText ? slots.labelText({}) : ` ${escape(labelText)} `}</label>` : ``} ${!isFluid && helperText ? `<div${add_classes(("bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "") + " " + (inline ? "bx--form__helper-text--inline" : "")).trim())}>${escape(helperText)}</div>` : ``}</div>` : ``} ${!inline && (labelText || $$slots.labelText) ? `<label${add_attribute("for", id, 0)}${add_classes(("bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "") + " " + (inline ? "bx--label--inline" : "") + " " + (inline && size === "sm" ? "bx--label--inline-sm" : "") + " " + (inline && size === "xl" ? "bx--label--inline-xl" : "")).trim())}>${slots.labelText ? slots.labelText({}) : ` ${escape(labelText)} `}</label>` : ``} <div${add_classes(("bx--text-input__field-outer-wrapper " + (inline ? "bx--text-input__field-outer-wrapper--inline" : "")).trim())}><div${add_attribute("data-invalid", error || void 0, 0)}${add_attribute("data-warn", warn || void 0, 0)}${add_classes(("bx--text-input__field-wrapper " + (!invalid && warn ? "bx--text-input__field-wrapper--warning" : "")).trim())}>${readonly ? `${validate_component(EditOff, "EditOff").$$render($$result, { class: "bx--text-input__readonly-icon" }, {}, {})}` : `${invalid ? `${validate_component(WarningFilled, "WarningFilled").$$render($$result, { class: "bx--text-input__invalid-icon" }, {}, {})}` : ``} ${!invalid && warn ? `${validate_component(WarningAltFilled, "WarningAltFilled").$$render(
    $$result,
    {
      class: "bx--text-input__invalid-icon\n            bx--text-input__invalid-icon--warning"
    },
    {},
    {}
  )}` : ``}`} <input${spread(
    [
      {
        "data-invalid": escape_attribute_value(error || void 0)
      },
      {
        "aria-invalid": escape_attribute_value(error || void 0)
      },
      {
        "data-warn": escape_attribute_value(warn || void 0)
      },
      {
        "aria-describedby": escape_attribute_value(error ? errorId : warn ? warnId : helperText ? helperId : void 0)
      },
      { disabled: disabled || null },
      { id: escape_attribute_value(id) },
      { name: escape_attribute_value(name) },
      {
        placeholder: escape_attribute_value(placeholder)
      },
      { required: required || null },
      { readonly: readonly || null },
      escape_object($$restProps)
    ],
    {
      classes: "bx--text-input " + (light ? "bx--text-input--light" : "") + " " + (error ? "bx--text-input--invalid" : "") + " " + (warn ? "bx--text-input--warning" : "") + " " + (size === "sm" ? "bx--text-input--sm" : "") + " " + (size === "xl" ? "bx--text-input--xl" : "")
    }
  )}${add_attribute("this", ref, 0)}${add_attribute("value", value, 0)}> ${isFluid ? `<hr${add_classes("bx--text-input__divider".trim())}>` : ``} ${isFluid && !inline && invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes("bx--form-requirement".trim())}>${escape(invalidText)}</div>` : ``} ${isFluid && !inline && warn ? `<div${add_attribute("id", warnId, 0)}${add_classes("bx--form-requirement".trim())}>${escape(warnText)}</div>` : ``}</div> ${!invalid && !warn && !isFluid && !inline && helperText ? `<div${add_attribute("id", helperId, 0)}${add_classes(("bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "") + " " + (inline ? "bx--form__helper-text--inline" : "")).trim())}>${escape(helperText)}</div>` : ``} ${!isFluid && invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes("bx--form-requirement".trim())}>${escape(invalidText)}</div>` : ``} ${!isFluid && !invalid && warn ? `<div${add_attribute("id", warnId, 0)}${add_classes("bx--form-requirement".trim())}>${escape(warnText)}</div>` : ``}</div></div>`;
});
const isSideNavCollapsed = writable(false);
const isSideNavRail = writable(false);
const Content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let unsetLeftMargin;
  let $$restProps = compute_rest_props($$props, ["id"]);
  let $isSideNavRail, $$unsubscribe_isSideNavRail;
  let $isSideNavCollapsed, $$unsubscribe_isSideNavCollapsed;
  $$unsubscribe_isSideNavRail = subscribe(isSideNavRail, (value) => $isSideNavRail = value);
  $$unsubscribe_isSideNavCollapsed = subscribe(isSideNavCollapsed, (value) => $isSideNavCollapsed = value);
  let { id = "main-content" } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  unsetLeftMargin = $isSideNavCollapsed && !$isSideNavRail;
  $$unsubscribe_isSideNavRail();
  $$unsubscribe_isSideNavCollapsed();
  return `<main${spread([{ id: escape_attribute_value(id) }, escape_object($$restProps)], {
    classes: "bx--content",
    styles: {
      "margin-left": unsetLeftMargin ? 0 : void 0
    }
  })}>${slots.default ? slots.default({}) : ``}</main>`;
});
d3.scaleOrdinal(["red"]);
const chartTypes = [
  {
    type: "linechart",
    admin: true,
    noisycharts_supported: true,
    active: false,
    names: [
      "linechart"
    ],
    config: {
      axis: [
        {
          name: "xColumn",
          "default": 0
        }
      ],
      settings: [
        {
          name: "chartlines"
        }
      ],
      wide: true,
      long: true
    }
  },
  {
    type: "verticalbar",
    admin: true,
    noisycharts_supported: true,
    active: false,
    names: [
      "stackedbar",
      "verticalbar"
    ],
    config: {
      axis: [
        {
          name: "xColumn",
          "default": 0
        },
        {
          name: "yColumn",
          "default": 1
        }
      ],
      settings: [
        {
          name: "stackedbars"
        }
      ],
      wide: true,
      long: false
    }
  },
  {
    type: "scatterplot",
    admin: false,
    active: false,
    noisycharts_supported: false,
    names: [
      "scatterplot"
    ],
    config: {
      axis: [],
      wide: false,
      long: true
    }
  },
  {
    type: "horizontalbar",
    admin: true,
    noisycharts_supported: true,
    active: false,
    names: [
      "horizontalbar"
    ],
    config: {
      axis: [
        {
          name: "yColumn",
          "default": 0
        },
        {
          name: "xColumn",
          "default": 1
        }
      ],
      settings: [
        {
          name: "stackedhorizontal"
        }
      ],
      wide: true,
      long: false
    }
  }
];
const css = {
  code: '@import "carbon-components-svelte/css/white.css";@import "$lib/css/chart.css";@import "$lib/css/fonts.css";@import "$lib/css/noto.css";@import "$lib/css/guardian.css";@import "$lib/css/darkmode.css";@import "$lib/css/greenscreen.css";@import "$lib/css/the-crunch.css";.chartSans{font-size:0.9rem;color:#767676;font-family:"Guardian Text Sans Web", "Agate Sans", sans-serif}.tick text{font-size:var(--axis-text);line-height:1em;font-family:"Guardian Text Sans Web", "Agate Sans", sans-serif}.addTick{font-size:var(--axis-text);line-height:1em;font-family:"Guardian Text Sans Web", "Agate Sans", sans-serif}.dataLine{stroke-width:var(--line-stroke)}.keyText{font-size:var(--footer-text)}.keyCircle{width:var(--footer-text);height:var(--footer-text)}#positionCounterValue{font-size:var(--pos-counter-text)}.footer{font-size:var(--footer-text)}.chartBlock{width:20%;height:0px;padding-bottom:20%;color:white;float:left;position:relative}.chartBlock .chart-interior{position:absolute;left:10px;right:10px;top:10px;bottom:10px;background-color:lightgrey;padding:10px;cursor:pointer}.chartBlock.active .chart-interior{background-color:#0f62fe}.chartBlock.inactive{pointer-events:none}',
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<main class=\\"{chartTheme}\\">\\n    <Content>\\n      <Grid>\\n        <Row>\\n          <Column>\\n            <h1>Noisycharts Composer</h1>\\n            <p>This thing makes audio charts and animates them</p>\\n          </Column>\\n        </Row>\\n\\n        <!-- Chart data input -->\\n        <Row>\\n  \\n          <Column>\\n            <h2>1. Import your data</h2>\\n              <Tabs>\\n                <Tab label=\\"Paste your data\\" />\\n                <Tab label=\\"Import Yacht chart\\" />\\n                  <svelte:fragment slot=\\"content\\">\\n                    <TabContent>\\n                      \\n                      <TextArea labelText=\\"Make sure your data is clean before your drop it\\" placeholder=\\"Paste your data here\\"\\n                      invalidText=\\"What is going on with your data?\\" bind:value={txtToJson}/>\\n\\n                      <Button on:click={() => checkDataInput(txtToJson)} disabled={txtToJson === ''}>\\n                        Load data\\n                      </Button>\\n\\n                    </TabContent>\\n                    <TabContent>\\n                      <Row>\\n                      <Column>\\n                        <TextInput placeholder=\\"Paste\\" bind:value={inputURL}/>\\n                      </Column>\\n                      <Column>\\n                          <Button on:click={loadData} disabled={inputURL === ''}>\\n                            Load chart\\n                          </Button>\\n                      </Column>   \\n                     </Row>\\n                    </TabContent>\\n                  </svelte:fragment>\\n              </Tabs>\\n        \\n          </Column>\\n        \\n        </Row>\\n        \\n        <!-- Chart type selection -->\\n        <Row>\\n          <Column>\\n            <h2>2. Select your chart type</h2>\\n            {#each activeCharts as chart, i}\\n            <div class=\\"chartBlock {chart.active ? 'active' : 'inactive'}\\" on:click={() => createChart({chart}, 'buttons')} role=\\"button\\" tabindex=\\"0\\">\\n              <div class=\\"chart-interior\\">{chart.type}</div>\\n            </div>\\n            {/each}\\n          </Column>\\n        </Row>\\n\\n        <Row>\\n          <Column>\\n          <h2>2. Edit and play chart</h2>\\n          <div class=\\"colorWrapper\\" id=\\"interactionZone\\">  \\n            <div class=\\"chartMaker\\" style=\\"width: {width}px;\\">\\n              <div id=\\"chartWrapper\\" class=\\"container {chartTheme}\\" style=\\"{cssVarStyles}\\">\\n                  <div class=\\"row\\" id=\\"furniture\\">\\n                    <div class=\\"chartTitle row\\" id=\\"chartTitle\\"  style=\\"font-size: {20 * chartSettings.textScaling}px;\\"><span class=\\"colouredTitle\\" bind:innerHTML={chartSettings.title} contenteditable=\\"true\\">{chartSettings.title}</span> </div>\\n                    {#if chartSettings.subtitle}\\n                    <div class=\\"subTitle row\\" id=\\"subTitle\\" style=\\"font-size: {16 * chartSettings.textScaling}px;\\" contenteditable=\\"true\\">{chartSettings.subtitle}</div>\\n                    {/if}\\n                    {#if chartSettings.chartKey}\\n                    <div id=\\"chartKey\\"></div>\\n                    {/if}\\n                  </div>\\n                {#if chartType}\\n                    <div id=\\"chartContainer\\"  style=\\"width: {width}px; height:{chartHeight}px;\\">\\n              \\n                        <div id=\\"positionCounter\\" draggable=\\"true\\" class=\\"draggable {noisyChartSettings.positionCounter ? 'show' : 'hide'}\\" >\\n                          <div id=\\"positionCounterTitle\\" style=\\"font-size: {12 * chartSettings.textScaling}px;\\"></div>\\n                          <div id=\\"positionCounterValue\\" class=\\"noto\\" style=\\"font-size: {20 * chartSettings.textScaling}px;\\"></div>\\n                        </div>\\n            \\n                      <svg width={width} height={chartHeight} id=\\"chart\\" overflow=\\"hidden\\">\\n                        <g transform=\\"translate({chartSettings.marginleft},{chartSettings.margintop})\\" id=\\"features\\"></g>\\n                      </svg>\\n                    </div>\\n  \\n                    {:else}\\n                    <div style=\\"width: {width}px; height:{chartHeight}px;\\" class=\\"placeHolder\\"><p class=\\"loading\\">{statusMessage}</p></div>\\n                  {/if}\\n                  <div class=\\"row footer\\" id=\\"footer\\">\\n                    <div class=\\"sourceText\\">\\n                      {#if watermark}<span>A <b>noisychart</b> by @nickevershed </span>{/if}{#if chartSettings.source}Source: <span id=\\"sourceText\\" contenteditable=\\"true\\">{chartSettings.source}</span>{/if}\\n                    </div>\\n                  </div>     \\n                </div>\\n            </div>\\n          </div>  \\n          </Column>\\n        </Row>\\n        {#if chartMaker}\\n          <Row>\\n            <Column>\\n              \\n              <Button on:click={playChart} disabled='{!loader}'>\\n                Play chart\\n              </Button>\\n              \\n            </Column>\\n            <Column>\\n              \\n              <!-- <Button on:click={exportAudio} disabled='{!loader}'>\\n                Export audio\\n              </Button> -->\\n              \\n            </Column>\\n          </Row>\\n          <Controls bind:noisyChartSettings loadInstruments={loadInstruments} bind:chartSettings setDimensions={setDimensions} reRenderChart={reRenderChart} updateOptions={updateOptions} bind:chartTheme changeStyle={changeStyle} bind:customBackground />\\n        {/if}\\n      </Grid>\\n    </Content>\\n    <div class=\\"mainFooter\\"></div>\\n  </main>\\n  \\n  <script>\\n    import {\\n      Button,\\n      Content,\\n      Grid,\\n      Row,\\n      Column,\\n      TextInput,\\n      Tabs,\\n      Tab,\\n      TabContent,\\n      TextArea\\n    } from \\"carbon-components-svelte\\";\\n    import { onMount } from 'svelte';\\n    import { schema } from 'newsroom-dojo';\\n    import { getJson, merge, config, analyseTime, getDuration } from '$lib/js/utils';\\n    import { setDefaults } from \\"$lib/js/setDefaults\\";\\n    import { convertData } from \\"$lib/js/convertData\\";\\n    import { checkData, parseDataInput, arrToJson, givePrompt } from \\"$lib/js/parseDataInput\\"\\n    import { checkDatasetShape, checkDataIsFormattedForChartType } from \\"$lib/js/checkDatasetShape\\"\\n    import { convertSpreadsheetData } from \\"$lib/js/convertSpreadsheetData\\"\\n    import { dragger } from '$lib/js/dragger';\\n    import NoisyChart from \\"$lib/js/sonicV2\\"\\n    import Controls from '$lib/components/Controls.svelte'\\n    import getDataTypeAnalysis from \\"$lib/js/detectDataType\\";\\n    // load the json with an import statement\\n    import chartTypes from '$lib/data/chartTypes.json';\\n    // console.log(linechartJson.sheets)\\n    // SUV\\n    // let inputURL = \\"https://docs.google.com/spreadsheets/d/1hxk6BFGjfsbTV8uRqlJWCvuiqZXUyqAgPrQXU08bVuk/edit#gid=0\\"\\n\\n    // Polling\\n\\n    let inputURL = \\"https://docs.google.com/spreadsheets/d/1HqFpDPomxnanDcMf92c8-f2m6STKO8ua9wtAUCbPjtw/edit?gid=0\\"\\n\\n    let templatesLoaded = false;\\n    async function loadJson(url) {\\n      try {\\n        const response = await fetch(url);\\n        if (!response.ok) throw new Error('Failed to load JSON');\\n        return await response.json();\\n      } catch (error) {\\n        console.error(error);\\n        // Handle error\\n      }\\n    }\\n\\n    // Houses\\n    // let inputURL = \\"https://docs.google.com/spreadsheets/d/1l6ERsxHPrsc1eBkoaV1WTsNuASKWLQCs_uzh-QdtRmI/edit#gid=0\\"\\n  \\n    // Horizontalbar testing\\n  \\n    // let inputURL = \\"https://docs.google.com/spreadsheets/d/12dBkU8rPdLNqVjRh3U2z1kB_SWXN9QQtYjFsTuDhZd0/edit#gid=1214286233\\"\\n  \\n    // let inputURL = \\"https://docs.google.com/spreadsheets/d/1EeblzY_1VdKR9TPg_USDSeaPdCeS9s0JLyhGGbeGrvY/edit\\"\\n  \\n    // Cavoodle demo\\n    // let inputURL = \\"https://docs.google.com/spreadsheets/d/1v4hMVF7qyn36yQy4e_ZE2FNvxc3QgwymDOWZM2dHw-Q/edit#gid=2083681420\\"\\n  \\n    \\n    /**\\n     * @type {RequestInfo | URL | null}\\n     */\\n    let chartURL = null\\n\\n    let statusMessage = \\"Waiting to load chart...\\"\\n    let loader = false\\n    let watermark = false\\n    let dataSource = null\\n    // Chart settings object \\n\\n    let chartSettings = {\\"title\\":\\"This is a headline\\", \\n                  \\"subtitle\\":\\"This is a subtitle\\", \\n                  \\"source\\":\\"The source text\\",\\n                  \\"margintop\\":10, \\n                  \\"marginbottom\\":20, \\n                  \\"marginleft\\":50, \\n                  \\"marginright\\":20, \\n                  \\"chartKey\\":true, \\n                  \\"textScaling\\":1}\\n\\n    /**\\n     * @type {string | null} \\n     */\\n    let chartType = null\\n    let chartData = {\\n      \\"sheets\\": {}\\n    }\\n\\n    // Because we still support the legacy google sheets json output data format, each object like settings etc needs to be the first element of an array\\n    chartData.sheets['template'] = [chartSettings]\\n\\n    let chartDataTypes = []\\n    let activeCharts = chartTypes.filter(d => d.noisycharts_supported)\\n    console.log(\\"activeCharts\\",activeCharts)\\n    let dataIsValid = false\\n    let txtToJson = \\"Year\\tPassenger\\tLight commercial\\tSUV\\\\n2012-01-01\\t51.9\\t17.83\\t27.5\\\\n2013-01-01\\t49.9\\t18\\t29.35\\\\n2014-01-01\\t47.75\\t17.78\\t31.65\\\\n2015-01-01\\t44.63\\t17.23\\t35.35\\\\n2016-01-01\\t41.27\\t18.48\\t37.43\\\\n2017-01-01\\t37.8\\t19.9\\t39.16\\\\n2018-01-01\\t32.8\\t20.64\\t42.95\\\\n2019-01-01\\t29.7\\t21.23\\t45.48\\\\n2020-01-01\\t24.2\\t22.42\\t49.59\\\\n2021-01-01\\t21.1\\t24.12\\t50.65\\\\n2022-01-01\\t18.8\\t23.71\\t53.14\\"\\n    let prompt = \\"\\"\\n    let width = 620\\n    let height = 480\\n    let chartHeight = 480\\n    let chartMaker = null\\n    let supportedCharts = ['linechart', 'verticalbar', 'horizontalbar']\\n    let soundPalette = ['Kalimba', 'Cello']\\n    let sonic = null;\\n    let chartTheme = 'the-crunch'\\n    let firstSynthLoad = false\\n    let dataConverted = false\\n    let dataSeries = []\\n    /**\\n     * @type {null}\\n     */\\n    let customBackground = null\\n    $: axisText = 14 * chartSettings.textScaling\\n    $: footerText = 12 * chartSettings.textScaling\\n    $: axisPad = 12 * chartSettings.textScaling\\n    $: lineStroke = Math.max(2 * chartSettings.textScaling, 4)\\n    $: cssVarStyles = \`--axis-text:\${axisText}px;--axis-pad:\${axisPad}px;--footer-text:\${footerText}px;--line-stroke:\${lineStroke}px;background-image: url(\\"\${customBackground}\\");background-size: cover;\`;\\n    \\n    // Sonification and animation option object, linked to the svelte controls\\n    \\n    let noisyChartSettings = {\\n      audioRendering: \\"discrete\\",\\n      chartMode:'fully accessible',\\n      duration: 5,\\n      low: 130.81,\\n      high: 523.25,\\n      simultaneous: false,\\n      pauseDuration:1000,\\n      invertAudio:false,\\n      selectedInstruments:[{seriesName: \\"Series 1\\", instrument: \\"Kalimba\\"}],\\n      scaleNotes: false,\\n      animationStyle: 'playthrough',\\n      timeClickEnabled:false,\\n      timeClick:null,\\n      interval:null,\\n      recording:false,\\n      positionCounter:false\\n    }\\n  \\n\\n  // Parses chart data from an input string  \\n\\n  // $: checkDataInput(txtToJson)\\n\\n  function checkDataInput(txt) {\\n\\n    prompt = \\"\\"\\n      \\n    if (txt != \\"\\" && checkData(txt)) {\\n\\n      // Parses the pasted text input\\n      // The resulting obect has information about the data, like the inferred data type of each column, date formats, etc\\n      // This is important for setting sensible default options\\n\\n      let resp = parseDataInput(txt)\\n\\n      chartDataTypes = resp\\n\\n      let data = arrToJson(resp)\\n      \\n      console.log(\\"resp\\",resp)\\n     \\n      let specs = checkDatasetShape(data, resp.type, resp.head)\\n      console.log(\\"specs\\", specs)\\n      chartDataTypes.datasheet = specs\\n\\n      // Sets the date time defaults\\n\\n      for (const col of chartDataTypes.type) {\\n\\n        if (col.list[0] == \\"date\\") {\\n          chartSettings.dateFormat = col.format\\n          // chartSettings.xAxisDateFormat = col.format\\n          break\\n        }\\n\\n      }\\n    \\n\\n      let filteredByShape = chartTypes.filter(d => d.config[specs.shape] && d.noisycharts_supported)\\n\\n      let newActiveCharts = filteredByShape.filter(d => checkDataIsFormattedForChartType(d, specs.frequencies))\\n      let newActiveChartsArray = newActiveCharts.map((x) => x.type)\\n      \\n      activeCharts.forEach(d => {\\n  \\n        if (newActiveChartsArray.includes(d.type)) {\\n          // console.log(\\"yeg\\")\\n          d.active = true\\n        }\\n      })\\n\\n      // Svelte needs this to know the array has been updated   \\n      activeCharts = activeCharts;\\n\\n      // console.log(activeCharts)\\n\\n      chartData.sheets.data = data\\n      chartData.sheets.cols = specs.specs\\n\\n      //console.log(orderJsonObjectByColumns(resp.head,data))\\n\\n      dataIsValid = true\\n      dataConverted = false\\n      dataSource = 'paste'\\n      prompt = 'Click the next step button to proceed'\\n\\n\\n    } else {\\n\\n      dataIsValid = false;\\n\\n      prompt = (txt.length > 0) ? givePrompt(txt) : ''\\n\\n    }\\n  }\\n\\n\\n\\n    // Loads chart data from a URL\\n  \\n    function loadData() {\\n      // console.log(inputURL)\\n      chartMaker = {}\\n      // console.log(\\"chartMaker\\",chartMaker)\\n      let chartJSONKey = null\\n      dataConverted = false\\n      // is it a google docs url? Later make this write JSON for a public sheet\\n  \\n      if (inputURL.includes(\\"docs.google.com\\")) {\\n        chartJSONKey = inputURL.split(\\"/\\")[5]\\n        // console.log(chartJSONKey)\\n        chartURL = \`https://interactive.guim.co.uk/docsdata/\${chartJSONKey}.json\`\\n      }\\n  \\n      // is it a yacht URL\\n  \\n      if (inputURL.includes(\\"interactive.guim.co.uk\\")) {\\n        \\n        // is it a front-end chart URL\\n\\n        if (inputURL.includes(\\"embed\\"))  {\\n          let docKey = inputURL.split(\\"key=\\")[1].split(\\"&location=\\")[0]\\n          let docLocation = inputURL.split(\\"&location=\\")[1]\\n          chartURL = \`https://interactive.guim.co.uk/\${docLocation}/\${docKey}.json\`\\n        }\\n        \\n        else {\\n          chartURL = inputURL\\n        }\\n        \\n      }\\n  \\n      if (chartURL) {\\n        fetch(chartURL)\\n        .then((response) => response.json())\\n        .then((results) => { \\n          \\n          // Update chart data with the spreadsheet/json data\\n          console.log(results)\\n\\n         \\n\\n          chartData = results\\n          let chartType = results['sheets']['chartId'][0]['type']\\n          let chartSettings = {chart: activeCharts.filter((d) => d.type === chartType)[0]}\\n          dataSource = 'yacht'\\n          // let specs = checkDatasetShape(data, resp.type, resp.head)\\n          // noisyChartSettings = setDefaults(chartData, noisyChartSettings)\\n          createChart(chartSettings)\\n\\n        });\\n  \\n  \\n      }\\n    }\\n  \\n    async function createChart(chartObj) {\\n\\n      chartType = chartObj.chart.type\\n      \\n      // Get the chart type\\n  \\n      console.log(\\"chartType\\", chartType)\\n      // check if it's a supported chart type\\n  \\n      if (supportedCharts.includes(chartType)) {\\n  \\n        if (chartType == \\"horizontalbar\\") {\\n          noisyChartSettings.audioRendering = \\"categorical\\"\\n          noisyChartSettings.positionCounter = false\\n          // noisyChartSettings.invertAudio = true\\n        }\\n  \\n        // Gets the default settings for each chart from a json file\\n        // If json is in the public directory \\n\\n        let defaults = await getJson(\`/templates/\${chartType}.json\`)\\n     \\n        // Merges the default settings with any we have from a remote Google doc\\n  \\n        let merged = merge(defaults, chartData)\\n        \\n        // console.log(\\"merged\\",merged)\\n\\n        // Parsing the settings from the merged object into a single settings object, converting things etc\\n  \\n        chartSettings = config(merged.sheets)\\n  \\n        console.log(\\"chartSettings\\", chartSettings)\\n\\n        let dataSchema = schema(chartSettings.data);\\n        \\n        if (dataConverted == false) {\\n          if (dataSource == \\"paste\\") {\\n            convertData(chartSettings.data, chartSettings)\\n            dataConverted = true\\n          }\\n          \\n          else if (dataSource == \\"yacht\\") {\\n            convertSpreadsheetData(chartSettings.data, chartSettings) \\n            dataConverted = true\\n          }\\n          \\n        }\\n\\n        // console.log(\\"convertedData\\", settings.data)\\n        // dateformat has been set so lets work out a good default interval etc\\n\\n        if (chartSettings.dateFormat != \\"\\") {\\n          let dateTimeResults = analyseTime(chartSettings.data, chartSettings)\\n   \\n          noisyChartSettings.interval = String(dateTimeResults.interval) + \\" \\" + dateTimeResults.timescale\\n          chartSettings.xAxisDateFormat = dateTimeResults.suggestedFormat\\n        }\\n\\n        // Resize as needed, tell all the things what to do\\n  \\n        let furnitureHeight = document.querySelector(\\"#furniture\\").getBoundingClientRect().height + document.querySelector(\\"#footer\\").getBoundingClientRect().height\\n        chartHeight = height - furnitureHeight\\n        chartSettings.width = width\\n        chartSettings.height = chartHeight\\n        chartSettings.chartKey = true\\n        // chartSettings.positionCounter = true\\n        chartSettings.textScaling = 1\\n\\n        // settings.timeClick = 10\\n        // If no color scheme set by user for the chart and no userkey set, then use the color scheme selected\\n  \\n        if (chartSettings.colorScheme == \\"\\" && chartSettings.userkey.length == 0) {\\n          chartSettings.colorScheme = chartTheme\\n        }\\n  \\n        // Make an instrument per data series, like a color palette\\n  \\n        dataSeries = chartSettings.keys.slice(1)\\n        \\n        if (chartSettings.type == \\"verticalbar\\") {\\n          dataSeries = dataSeries.slice(0,1)\\n        }\\n\\n\\n        dataSeries.forEach((series,i) => {\\n          console.log(series)\\n          noisyChartSettings.selectedInstruments[i] = {seriesName: series, instrument: \\"Kalimba\\"}\\n        })\\n  \\n        noisyChartSettings.duration = getDuration(chartSettings.data)\\n        // console.log(\\"note\\",noisyChartSettings.note)\\n        sonic = new NoisyChart({chartSettings:chartSettings, noisyChartSettings:noisyChartSettings, dataKeys:dataSeries})\\n        sonic.setupSonicData({data:chartSettings.data, options:noisyChartSettings})\\n        // Set up synths and load samples\\n  \\n        loader = sonic.loadSynths(noisyChartSettings)\\n  \\n        // Render the chart by importing the specified chart module\\n  \\n        import(\`$lib/js/\${chartType}.js\`).then((chartModule) => {   \\n            chartMaker = new chartModule.default(chartSettings)\\n            chartMaker.render()\\n            // sonic.test(chartMaker.test)\\n            sonic.setAnimateCircle(chartMaker.makeCircle)\\n\\n            if (noisyChartSettings.audioRendering == 'discrete') {\\n              sonic.setChartAnimation(chartMaker.animateDiscrete)\\n            }\\n\\n            else if (noisyChartSettings.audioRendering == 'continuous') {\\n              sonic.setChartAnimation(chartMaker.animateContinuous)\\n            }\\n\\n            sonic.addInteraction()\\n\\n            let draggies = document.querySelectorAll(\\".draggable\\");\\n            draggies.forEach(item => {\\n              dragger(item,  document.querySelectorAll(\\"#chartContainer\\")) \\n            }) \\n        })\\n      }\\n  \\n      else {\\n        statusMessage = \`Chart type \${chartType} not supported\`\\n      }\\n      \\n    } // end setupChart\\n  \\n    function playChart() {\\n      // console.log(\\"noisyChartSettings\\", noisyChartSettings)\\n      // chartMaker.play(noisyChartSettings, sonic)\\n\\n      chartMaker.resetAnimation(noisyChartSettings)\\n      sonic.playPause()\\n    }\\n  \\n    function exportAudio() {\\n      // console.log(\\"noisyChartSettings\\", noisyChartSettings)\\n      chartMaker.play(noisyChartSettings, sonic)\\n    }\\n  \\n    function loadInstruments(event) {\\n      if (event) {\\n        console.log(\\"loading...\\")\\n        loader = sonic.loadSynths(noisyChartSettings)\\n      }\\n    }\\n  \\n    function changeStyle(event) {\\n      // console.log(\\"changeStyle\\")\\n      if (chartSettings.userkey.length == 0) {\\n        // console.log(chartTheme)\\n        chartSettings.colorScheme = chartTheme\\n        chartMaker.render(chartSettings)\\n        \\n        // if (chartTheme == \\"the-crunch\\") {\\n        //   customBackground = \\"https://interactive.guim.co.uk/embed/aus/2023/texture-looped.gif\\"\\n        // }\\n      }\\n  \\n    }\\n  \\n    function setDimensions(value) {\\n      if (value) {\\n        // console.log(value)\\n        width = Number(value.split(\\",\\")[0])\\n        height = Number(value.split(\\",\\")[1])\\n        let ratio = width / 620\\n        chartSettings.textScaling = ratio\\n        chartSettings.marginbottom = chartSettings.marginbottom * ratio\\n        chartSettings.marginleft = chartSettings.marginleft * ratio\\n        chartSettings.marginright = chartSettings.marginright * ratio\\n        chartSettings.margintop = chartSettings.margintop * ratio\\n  \\n        // console.log(\\"ratio\\", ratio)\\n        setTimeout(() => {\\n          let furnitureHeight = document.querySelector(\\"#furniture\\").getBoundingClientRect().height + document.querySelector(\\"#footer\\").getBoundingClientRect().height\\n          // console.log(\\"furny height\\", furnitureHeight)\\n          chartHeight = height - furnitureHeight\\n          chartSettings.width = width\\n          chartSettings.height = chartHeight\\n          // chartSettings.width = width\\n          // chartSettings.height = height\\n          chartMaker.render(chartSettings)\\n        },500)\\n        \\n      }\\n    } \\n    \\n    function reRenderChart() {\\n      chartMaker.render(chartSettings)\\n    }\\n\\n    function updateOptions() {\\n      if (chartMaker && sonic) {\\n        if (noisyChartSettings.audioRendering == 'discrete') {\\n              sonic.setChartAnimation(chartMaker.animateDiscrete)\\n            }\\n\\n        else if (noisyChartSettings.audioRendering == 'continuous') {\\n          sonic.setChartAnimation(chartMaker.animateContinuous)\\n        }\\n      }\\n      sonic.setupSonicData({data:chartSettings.data, options:noisyChartSettings})\\n    }\\n  \\n  <\/script>\\n  \\n  \\n  <style lang=\\"scss\\" global>@import \\"carbon-components-svelte/css/white.css\\";\\n@import \\"$lib/css/chart.css\\";\\n@import \\"$lib/css/fonts.css\\";\\n@import \\"$lib/css/noto.css\\";\\n@import \\"$lib/css/guardian.css\\";\\n@import \\"$lib/css/darkmode.css\\";\\n@import \\"$lib/css/greenscreen.css\\";\\n@import \\"$lib/css/the-crunch.css\\";\\n:global(.chartSans) {\\n  font-size: 0.9rem;\\n  color: #767676;\\n  font-family: \\"Guardian Text Sans Web\\", \\"Agate Sans\\", sans-serif;\\n}\\n\\n:global(.tick) :global(text) {\\n  font-size: var(--axis-text);\\n  line-height: 1em;\\n  font-family: \\"Guardian Text Sans Web\\", \\"Agate Sans\\", sans-serif;\\n}\\n\\n:global(.addTick) {\\n  font-size: var(--axis-text);\\n  line-height: 1em;\\n  font-family: \\"Guardian Text Sans Web\\", \\"Agate Sans\\", sans-serif;\\n}\\n\\n:global(.dataLine) {\\n  stroke-width: var(--line-stroke);\\n}\\n\\n:global(.keyText) {\\n  font-size: var(--footer-text);\\n}\\n\\n:global(.keyCircle) {\\n  width: var(--footer-text);\\n  height: var(--footer-text);\\n}\\n\\n:global(#positionCounterValue) {\\n  font-size: var(--pos-counter-text);\\n}\\n\\n:global(.footer) {\\n  font-size: var(--footer-text);\\n}\\n\\n:global(.chartBlock) {\\n  width: 20%;\\n  height: 0px;\\n  padding-bottom: 20%;\\n  color: white;\\n  float: left;\\n  position: relative;\\n}\\n:global(.chartBlock) :global(.chart-interior) {\\n  position: absolute;\\n  left: 10px;\\n  right: 10px;\\n  top: 10px;\\n  bottom: 10px;\\n  background-color: lightgrey;\\n  padding: 10px;\\n  cursor: pointer;\\n}\\n\\n:global(.chartBlock.active) :global(.chart-interior) {\\n  background-color: #0f62fe;\\n}\\n\\n:global(.chartBlock.inactive) {\\n  pointer-events: none;\\n}</style>\\n  \\n  "],"names":[],"mappings":"AAqmB4B,QAAQ,wCAAwC,CAC5E,QAAQ,oBAAoB,CAC5B,QAAQ,oBAAoB,CAC5B,QAAQ,mBAAmB,CAC3B,QAAQ,uBAAuB,CAC/B,QAAQ,uBAAuB,CAC/B,QAAQ,0BAA0B,CAClC,QAAQ,yBAAyB,CACzB,UAAY,CAClB,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,wBAAwB,CAAC,CAAC,YAAY,CAAC,CAAC,UACvD,CAEQ,KAAM,CAAS,IAAM,CAC3B,SAAS,CAAE,IAAI,WAAW,CAAC,CAC3B,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,wBAAwB,CAAC,CAAC,YAAY,CAAC,CAAC,UACvD,CAEQ,QAAU,CAChB,SAAS,CAAE,IAAI,WAAW,CAAC,CAC3B,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,wBAAwB,CAAC,CAAC,YAAY,CAAC,CAAC,UACvD,CAEQ,SAAW,CACjB,YAAY,CAAE,IAAI,aAAa,CACjC,CAEQ,QAAU,CAChB,SAAS,CAAE,IAAI,aAAa,CAC9B,CAEQ,UAAY,CAClB,KAAK,CAAE,IAAI,aAAa,CAAC,CACzB,MAAM,CAAE,IAAI,aAAa,CAC3B,CAEQ,qBAAuB,CAC7B,SAAS,CAAE,IAAI,kBAAkB,CACnC,CAEQ,OAAS,CACf,SAAS,CAAE,IAAI,aAAa,CAC9B,CAEQ,WAAa,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,cAAc,CAAE,GAAG,CACnB,KAAK,CAAE,KAAK,CACZ,KAAK,CAAE,IAAI,CACX,QAAQ,CAAE,QACZ,CACQ,WAAY,CAAS,eAAiB,CAC5C,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,IAAI,CACV,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,IAAI,CACT,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,SAAS,CAC3B,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,OACV,CAEQ,kBAAmB,CAAS,eAAiB,CACnD,gBAAgB,CAAE,OACpB,CAEQ,oBAAsB,CAC5B,cAAc,CAAE,IAClB"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let axisText;
  let footerText;
  let axisPad;
  let lineStroke;
  let cssVarStyles;
  let inputURL = "https://docs.google.com/spreadsheets/d/1HqFpDPomxnanDcMf92c8-f2m6STKO8ua9wtAUCbPjtw/edit?gid=0";
  let statusMessage = "Waiting to load chart...";
  let chartSettings = {
    "title": "This is a headline",
    "subtitle": "This is a subtitle",
    "source": "The source text",
    "margintop": 10,
    "marginbottom": 20,
    "marginleft": 50,
    "marginright": 20,
    "chartKey": true,
    "textScaling": 1
  };
  let activeCharts = chartTypes.filter((d) => d.noisycharts_supported);
  console.log("activeCharts", activeCharts);
  let txtToJson = "Year	Passenger	Light commercial	SUV\n2012-01-01	51.9	17.83	27.5\n2013-01-01	49.9	18	29.35\n2014-01-01	47.75	17.78	31.65\n2015-01-01	44.63	17.23	35.35\n2016-01-01	41.27	18.48	37.43\n2017-01-01	37.8	19.9	39.16\n2018-01-01	32.8	20.64	42.95\n2019-01-01	29.7	21.23	45.48\n2020-01-01	24.2	22.42	49.59\n2021-01-01	21.1	24.12	50.65\n2022-01-01	18.8	23.71	53.14";
  let width = 620;
  let chartHeight = 480;
  let chartTheme = "the-crunch";
  let customBackground = null;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    axisText = 14 * chartSettings.textScaling;
    footerText = 12 * chartSettings.textScaling;
    axisPad = 12 * chartSettings.textScaling;
    lineStroke = Math.max(2 * chartSettings.textScaling, 4);
    cssVarStyles = `--axis-text:${axisText}px;--axis-pad:${axisPad}px;--footer-text:${footerText}px;--line-stroke:${lineStroke}px;background-image: url("${customBackground}");background-size: cover;`;
    $$rendered = `<main${add_attribute("class", chartTheme, 0)}>${validate_component(Content, "Content").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Grid, "Grid").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Row, "Row").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
                  default: () => {
                    return `<h1 data-svelte-h="svelte-xy5khz">Noisycharts Composer</h1> <p data-svelte-h="svelte-zgcynt">This thing makes audio charts and animates them</p>`;
                  }
                })}`;
              }
            })}  ${validate_component(Row, "Row").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
                  default: () => {
                    return `<h2 data-svelte-h="svelte-e00591">1. Import your data</h2> ${validate_component(Tabs, "Tabs").$$render($$result, {}, {}, {
                      content: () => {
                        return `${validate_component(TabContent, "TabContent").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(TextArea, "TextArea").$$render(
                              $$result,
                              {
                                labelText: "Make sure your data is clean before your drop it",
                                placeholder: "Paste your data here",
                                invalidText: "What is going on with your data?",
                                value: txtToJson
                              },
                              {
                                value: ($$value) => {
                                  txtToJson = $$value;
                                  $$settled = false;
                                }
                              },
                              {}
                            )} ${validate_component(Button, "Button").$$render($$result, { disabled: txtToJson === "" }, {}, {
                              default: () => {
                                return `Load data`;
                              }
                            })}`;
                          }
                        })} ${validate_component(TabContent, "TabContent").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(Row, "Row").$$render($$result, {}, {}, {
                              default: () => {
                                return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
                                  default: () => {
                                    return `${validate_component(TextInput, "TextInput").$$render(
                                      $$result,
                                      { placeholder: "Paste", value: inputURL },
                                      {
                                        value: ($$value) => {
                                          inputURL = $$value;
                                          $$settled = false;
                                        }
                                      },
                                      {}
                                    )}`;
                                  }
                                })} ${validate_component(Column, "Column").$$render($$result, {}, {}, {
                                  default: () => {
                                    return `${validate_component(Button, "Button").$$render($$result, { disabled: inputURL === "" }, {}, {
                                      default: () => {
                                        return `Load chart`;
                                      }
                                    })}`;
                                  }
                                })}`;
                              }
                            })}`;
                          }
                        })} `;
                      },
                      default: () => {
                        return `${validate_component(Tab, "Tab").$$render($$result, { label: "Paste your data" }, {}, {})} ${validate_component(Tab, "Tab").$$render($$result, { label: "Import Yacht chart" }, {}, {})}`;
                      }
                    })}`;
                  }
                })}`;
              }
            })}  ${validate_component(Row, "Row").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
                  default: () => {
                    return `<h2 data-svelte-h="svelte-1x8vxod">2. Select your chart type</h2> ${each(activeCharts, (chart, i) => {
                      return `<div class="${"chartBlock " + escape(chart.active ? "active" : "inactive", true)}" role="button" tabindex="0"><div class="chart-interior">${escape(chart.type)}</div> </div>`;
                    })}`;
                  }
                })}`;
              }
            })} ${validate_component(Row, "Row").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
                  default: () => {
                    return `<h2 data-svelte-h="svelte-1cg29lr">2. Edit and play chart</h2> <div class="colorWrapper" id="interactionZone"><div class="chartMaker" style="${"width: " + escape(width, true) + "px;"}"><div id="chartWrapper" class="${"container " + escape(chartTheme, true)}"${add_attribute("style", cssVarStyles, 0)}><div class="row" id="furniture"><div class="chartTitle row" id="chartTitle" style="${"font-size: " + escape(20 * chartSettings.textScaling, true) + "px;"}"><span class="colouredTitle" contenteditable="true">${(($$value) => $$value === void 0 ? `${escape(chartSettings.title)}` : $$value)(chartSettings.title)}</span></div> ${chartSettings.subtitle ? `<div class="subTitle row" id="subTitle" style="${"font-size: " + escape(16 * chartSettings.textScaling, true) + "px;"}" contenteditable="true">${escape(chartSettings.subtitle)}</div>` : ``} ${chartSettings.chartKey ? `<div id="chartKey"></div>` : ``}</div> ${`<div style="${"width: " + escape(width, true) + "px; height:" + escape(chartHeight, true) + "px;"}" class="placeHolder"><p class="loading">${escape(statusMessage)}</p></div>`} <div class="row footer" id="footer"><div class="sourceText">${``}${chartSettings.source ? `Source: <span id="sourceText" contenteditable="true">${escape(chartSettings.source)}</span>` : ``}</div></div></div></div></div>`;
                  }
                })}`;
              }
            })} ${``}`;
          }
        })}`;
      }
    })} <div class="mainFooter"></div> </main>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
