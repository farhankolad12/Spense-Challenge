import { useState, FormEvent, useRef, Key } from "react";
import useGetReq from "../hooks/useGetReq";
import ErrorCon from "../components/Message/ErrorCon";
import { CategoryType } from "./CategoryPage";
import { SubCategoryType } from "./SubCategoryPage";
import { InnerSubCategoryType } from "./InnerSubCategoryPage";
import { BrandType } from "./BrandPage";
import usePostReq from "../hooks/usePostReq";
import { AttributeType } from "./AttributePage";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import BtnLoading from "../components/Message/BtnLoading";
import SuccessCon from "../components/Message/SuccessCon";

type Variation = {
  id: string;
  price: string;
  discountedPrice: string;
  quantity: string;
  name: string;
};

type ShippingConfig = {
  freeShiping: boolean;
  rate: number | undefined;
};

export type ProductType = {
  category: {
    name: string;
    id: string;
  };
  subCategory: {
    name: string;
    id: string;
  };
  innerSubCategory: {
    name: string;
    id: string;
  };
  name: string;
  sku: string;
  brandName: string;
  img: File | undefined | string;
  tags: String[];
  variations: {
    attribute: String;
    info: Variation[];
  };
  pricing: {
    oldPrice: string;
    discountedPrice: string;
    quantity: string;
  };
  description: string;
  shippingConfig: ShippingConfig;
  isFeature: boolean;
  isHotDeals: boolean;
  shippingTime: string;
  tax: {
    rate: number;
    type: string;
  };
  id: string | Key;
};

export default function ProductsAdd({
  product,
}: {
  product: ProductType | undefined;
}) {
  // const [categoryName, setCategoryName] = useState(
  //   product ? product.category : ""
  // );
  // const [categoryId, setCategoryId] = useState("");
  const [category, setCategory] = useState(
    product
      ? product.category
      : {
          name: "",
          id: "0",
        }
  );
  const [subCategory, setSubCategory] = useState(
    product
      ? product.subCategory
      : {
          name: "",
          id: "0",
        }
  );
  // const [subCategoryId, setSubCategoryId] = useState("");
  const [innerSubCategory, setInnerSubCategory] = useState(
    product
      ? product.innerSubCategory
      : {
          name: "",
          id: "0",
        }
  );
  const [productName, setProductName] = useState(product ? product.name : "");
  const [brandName, setBrandName] = useState(product ? product.brandName : "0");
  const [sku, setSku] = useState(product ? product.sku : "");
  const [img, setImg] = useState<File | string | undefined>(
    product ? product.img : undefined
  );
  const [tags, setTags] = useState<String[]>(product ? product.tags : []);
  const [variationName, setVariationName] = useState(
    product ? product.variations.attribute : ""
  );
  const [variations, setVariations] = useState<Variation[]>(
    product ? product.variations.info : []
  );
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [shippingConfig, setShippingConfig] = useState<
    ShippingConfig | undefined
  >(product ? product.shippingConfig : undefined);
  const [oldPrice, setOldPrice] = useState(
    product ? product.pricing.oldPrice : ""
  );
  const [discountedPrice, setDiscountedPrice] = useState(
    product ? product.pricing.discountedPrice : ""
  );
  const [quantity, setQuantity] = useState(
    product ? product.pricing.quantity : ""
  );
  const [isFeature, setIsFeature] = useState(
    product ? product.isFeature : false
  );
  const [isHotDeals, setIsHotDeals] = useState(
    product ? product.isHotDeals : false
  );
  const [shippingTime, setShippingTime] = useState(
    product ? product.shippingTime : ""
  );
  const [tax, setTax] = useState(
    product
      ? product.tax
      : {
          rate: 0,
          type: "Flat",
        }
  );
  const [success, setSuccess] = useState("");

  const {
    error: categoryErr,
    loading: categoryLoading,
    userData: categories,
  } = useGetReq("/category/get-category", {
    id: category.id,
    subCategoryId: subCategory.id,
  });

  const {
    error: subErr,
    loading: subLoading,
    userData: subCategories,
  } = useGetReq("/category/get-subcategory-category-id", {
    id: category.id,
    subCategoryId: subCategory.id,
  });

  const {
    error: innerErr,
    loading: innerLoading,
    userData: innerSubCategories,
  } = useGetReq("/category/get-innersubcategory-id", {
    id: subCategory.id,
    categoryId: category.id,
  });

  const {
    error: brandErr,
    loading: brandLoading,
    userData: brands,
  } = useGetReq("/brand/get-brand", {});

  const {
    error: attrErr,
    loading: attrLoading,
    userData: attributes,
  } = useGetReq("/attributes/get-attribute", {});

  const {
    error: postErr,
    execute,
    loading: postLoading,
    setError,
  } = usePostReq("/products/add-product");

  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  function handleTags(e: any) {
    if (e.code === "Space") {
      const tag = e.currentTarget?.value.toString().trim();
      if (tag === "" || tag === " ") {
        setError("Tag cannot be empty");
        setTimeout(() => setError(""), 4000);
        return (e.currentTarget.value = "");
      }
      if (tags.some((selectedTag) => selectedTag === tag)) {
        setError(tag + " already in tag");
        setTimeout(() => setError(""), 4000);
        return (e.currentTarget.value = "");
      }
      setTags([...tags, tag.toString()]);
      return (e.currentTarget.value = "");
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (
      category.name === "" ||
      subCategory.name === "" ||
      innerSubCategory.name === "" ||
      brandName === "" ||
      tags.length === 0 ||
      (variations.length > 0 && variationName === "") ||
      !shippingConfig ||
      !img
    ) {
      setError("Please fill the required fields!");
      return setTimeout(() => setError(""), 4000);
    }

    const pricing = {
      oldPrice,
      discountedPrice,
      quantity,
    };

    const productVariations = {
      attribute: variationName,
      info: variations,
    };

    try {
      const formData = new FormData();
      formData.append("category", JSON.stringify(category));
      formData.append("subCategory", JSON.stringify(subCategory));
      formData.append("innerSubCategory", JSON.stringify(innerSubCategory));
      formData.append("name", productName);
      formData.append("sku", sku);
      formData.append("brandName", brandName);
      formData.append("img", img);
      formData.append("tags", JSON.stringify(tags));
      formData.append(
        "variations",
        JSON.stringify({ variations: productVariations })
      );
      formData.append("pricing", JSON.stringify(pricing));
      formData.append("description", description);
      formData.append("shippingConfig", JSON.stringify(shippingConfig));
      formData.append("isFeature", isFeature.toString());
      formData.append("isHotDeals", isHotDeals.toString());
      formData.append("shippingTime", shippingTime);
      formData.append("tax", JSON.stringify(tax));
      formData.append("id", nanoid());

      const res = await execute(formData);
      if (!res.success) {
        setError(res.message);
        return setTimeout(() => setError(""), 4000);
      }
      formRef.current?.reset();
      setProductName("");
      setSku("");
      setTags([]);
      setVariations([]);
      setOldPrice("");
      setDiscountedPrice("");
      setQuantity("");
      setDescription("");
      setShippingConfig({
        freeShiping: false,
        rate: 0,
      });
      setIsFeature(false);
      setIsHotDeals(false);
      setShippingTime("");
      setTax({
        rate: 0,
        type: "Flat",
      });
      setSuccess("Product saved!");
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError("Something went wrong!");
      setTimeout(() => setError(""), 4000);
    }
  }

  return (
    <>
      <ErrorCon error={categoryErr} />
      <SuccessCon success={success} />
      <ErrorCon error={subErr} />
      <ErrorCon error={innerErr} />
      <ErrorCon error={brandErr} />
      <ErrorCon error={attrErr} />
      <ErrorCon error={postErr} />
      <h3 className="mb-4">Add Product</h3>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="container-fluid d-md-flex gap-5">
          <div className="d-flex flex-column gap-4">
            <div className="p-4 bg-white">
              <h3 className="text-uppercase">product information</h3>
              <div className="d-flex flex-column gap-4 mt-4">
                <div className="d-md-flex gap-3 align-items-center">
                  <label htmlFor="category" className="text-uppercase">
                    Category
                  </label>
                  {!categoryLoading
                    ? categories && (
                        <select
                          defaultValue={category.id}
                          onChange={(e) => {
                            setCategory({
                              id: e.target.value,
                              name: e.target.options[e.target.selectedIndex]
                                .text,
                            });
                            /* setCategoryId(e.target.value);
                            setCategoryName(
                              e.target.options[e.target.selectedIndex].text
                            ); */
                          }}
                          className="form-control"
                          id="category"
                        >
                          <option disabled value="0">
                            Please Select
                          </option>
                          {categories.map((category: CategoryType) => {
                            return (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            );
                          })}
                        </select>
                      )
                    : "loading"}
                </div>
                <div className="d-md-flex gap-3 align-items-center">
                  <label className="text-uppercase" htmlFor="sub-category">
                    subcategory
                  </label>
                  {!subLoading
                    ? subCategories && (
                        <select
                          defaultValue={subCategory.id}
                          onChange={(e) => {
                            setSubCategory({
                              id: e.target.value,
                              name: e.target.options[e.target.selectedIndex]
                                .text,
                            });
                          }}
                          className="form-control"
                          id="sub-cateogry"
                        >
                          {subCategories.map((subCategory: SubCategoryType) => {
                            return (
                              <option
                                key={subCategory.id}
                                value={subCategory.id}
                              >
                                {subCategory.name}
                              </option>
                            );
                          })}
                        </select>
                      )
                    : "loading..."}
                </div>
                <div className="d-md-flex gap-3 align-items-center">
                  <label className="text-uppercase" htmlFor="inner-subcategory">
                    inner subcategory
                  </label>
                  {!innerLoading
                    ? innerSubCategories && (
                        <select
                          defaultValue={innerSubCategory.id}
                          onChange={(e) => {
                            setInnerSubCategory({
                              id: e.target.value,
                              name: e.target.options[e.target.selectedIndex]
                                .text,
                            });
                          }}
                          className="form-control"
                          id="inner-subcategory"
                        >
                          <option disabled value="0">
                            Please Select
                          </option>
                          {innerSubCategories.map(
                            (innerSubCategory: InnerSubCategoryType) => {
                              return (
                                <option
                                  key={innerSubCategory.id}
                                  value={innerSubCategory.id}
                                >
                                  {innerSubCategory.name}
                                </option>
                              );
                            }
                          )}
                        </select>
                      )
                    : "loading..."}
                </div>
                <div className="d-md-flex gap-3 align-items-center">
                  <label className="text-uppercase" htmlFor="productName">
                    product name
                  </label>
                  <input
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    id="productName"
                    type="text"
                    className="form-control"
                    placeholder="Enter product name"
                  />
                </div>
                <div className="d-md-flex gap-3 align-items-center">
                  <label className="text-uppercase" htmlFor="brands">
                    brand
                  </label>
                  {!brandLoading
                    ? brands && (
                        <select
                          defaultValue={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                          className="form-control"
                          id="brands"
                        >
                          <option disabled value="0">
                            Please select
                          </option>
                          {brands.map((brand: BrandType) => {
                            return (
                              <option key={brand.id} value={brand.name}>
                                {brand.name}
                              </option>
                            );
                          })}
                        </select>
                      )
                    : "loading..."}
                </div>
                <div className="d-md-flex gap-3 align-items-center">
                  <label className="text-uppercase" htmlFor="sku">
                    sku
                  </label>
                  <input
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    id="sku"
                    type="text"
                    className="form-control"
                    placeholder="SKU"
                    required
                  />
                </div>
                <div className="d-md-flex gap-3 align-items-center">
                  <label className="text-uppercase" htmlFor="product-img">
                    image
                  </label>
                  <input
                    onChange={(e) => setImg(e.target.files?.[0])}
                    type="file"
                    id="product-img"
                    className="form-control"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="bg-white p-4">
              <h3>Tags</h3>
              <div className="d-md-flex gap-3 mt-4">
                <label className="text-uppercase" htmlFor="tags">
                  tags
                </label>
                <div
                  className="d-flex flex-column"
                  style={{ position: "relative" }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: ".8rem",
                      left: ".5rem",
                    }}
                    className="d-flex gap-3"
                  >
                    {tags.map((tag) => {
                      return (
                        <div className="bg-success text-light rounded p-2 d-flex align-items-center gap-1">
                          <span>{tag}</span>
                          <button
                            onClick={() =>
                              setTags(
                                tags.filter((filterTag) => {
                                  return filterTag !== tag;
                                })
                              )
                            }
                            className="btn p-0"
                          >
                            <i className="bi bi-x text-light" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <input
                    autoComplete="off"
                    style={
                      tags.length > 0
                        ? {
                            paddingTop: "2rem",
                            paddingLeft: `${(tags.length * 6).toString()}rem`,
                          }
                        : {}
                    }
                    onKeyDown={handleTags}
                    id="tags"
                    type="text"
                    className="form-control"
                    placeholder="tags"
                  />
                  <span>
                    Type any word related to your product & enter space. This
                    will create tag & use for search your product based on this.
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white p-4">
              <div className="d-md-flex gap-4">
                <label htmlFor="variations">IS VARIATION AVAILABLE?</label>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      return setVariations([
                        ...variations,
                        {
                          id: nanoid(),
                          price: "0",
                          discountedPrice: "0",
                          quantity: "0",
                          name: "",
                        },
                      ]);
                    }
                    setVariations([]);
                  }}
                />
              </div>
              {variations.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  <div className="d-md-flex my-4 gap-4">
                    <label htmlFor="attribute" className="text-uppercase">
                      attribute
                    </label>
                    <select
                      onChange={(e) => {
                        return setVariationName(e.target.value);
                      }}
                      className="form-control"
                      id="attribute"
                    >
                      <option selected disabled value="0">
                        Please select
                      </option>
                      {!attrLoading
                        ? attributes &&
                          attributes.map((attr: AttributeType) => {
                            return (
                              <option value={attr.name}>{attr.name}</option>
                            );
                          })
                        : "loading"}
                    </select>
                  </div>
                  {variations.map((varia, i) => {
                    return (
                      <div className="d-md-flex gap-4 align-items-center">
                        <div className="d-flex flex-column">
                          <label htmlFor="variation" className="text-uppercase">
                            variation
                          </label>
                          <input
                            value={varia.name}
                            onChange={(e) => {
                              setVariations(() => {
                                const newVarArr = variations.filter((vari) => {
                                  if (vari.id === varia.id) {
                                    vari.name = e.target.value;
                                  }
                                  return vari;
                                });
                                return newVarArr;
                              });
                            }}
                            type="text"
                            id="variation"
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="d-flex flex-column">
                          <label htmlFor="price">price</label>
                          <input
                            required
                            value={varia.price}
                            onChange={(e) => {
                              setVariations(() => {
                                const newVarArr = variations.filter((vari) => {
                                  if (vari.id === varia.id) {
                                    vari.price = e.target.value;
                                  }
                                  return vari;
                                });
                                return newVarArr;
                              });
                            }}
                            type="text"
                            id="price"
                            className="form-control"
                          />
                        </div>
                        <div className="d-flex flex-column">
                          <label htmlFor="dis-price">DISCOUNTED PRICE</label>
                          <input
                            required
                            value={varia.discountedPrice}
                            onChange={(e) => {
                              setVariations(() => {
                                const newVarArr = variations.filter((vari) => {
                                  if (vari.id === varia.id) {
                                    vari.discountedPrice = e.target.value;
                                  }
                                  return vari;
                                });
                                return newVarArr;
                              });
                            }}
                            type="text"
                            id="dis-price"
                            className="form-control"
                          />
                        </div>
                        <div className="d-flex flex-column">
                          <label htmlFor="qty">QTY</label>
                          <input
                            required
                            value={varia.quantity}
                            onChange={(e) => {
                              setVariations(() => {
                                const newVarArr = variations.filter((vari) => {
                                  if (vari.id === varia.id) {
                                    vari.quantity = e.target.value;
                                  }
                                  return vari;
                                });
                                return newVarArr;
                              });
                            }}
                            type="text"
                            id="qty"
                            className="form-control"
                          />
                        </div>
                        {i === 0 ? (
                          <button
                            type="button"
                            onClick={() => {
                              return setVariations([
                                ...variations,
                                {
                                  id: nanoid(),
                                  price: "0",
                                  discountedPrice: "0",
                                  name: "",
                                  quantity: "",
                                },
                              ]);
                            }}
                            className="btn btn-warning"
                          >
                            <i className="bi bi-plus" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              return setVariations(
                                variations.filter((variation) => {
                                  return variation.id !== varia.id;
                                })
                              );
                            }}
                            className="btn btn-danger"
                          >
                            <i className="bi bi-dash" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="d-flex flex-column gap-3 my-4">
                  <div className="d-md-flex gap-4">
                    <label htmlFor="price" className="text-uppercase">
                      price
                    </label>
                    <input
                      value={oldPrice}
                      onChange={(e) => setOldPrice(e.target.value)}
                      required
                      placeholder="Enter old price"
                      type="text"
                      id="price"
                      className="form-control"
                    />
                  </div>
                  <div className="d-md-flex gap-4">
                    <label htmlFor="dis-price" className="text-uppercase">
                      discounted price
                    </label>
                    <input
                      required
                      value={discountedPrice}
                      onChange={(e) => setDiscountedPrice(e.target.value)}
                      placeholder="Enter discounted price"
                      type="text"
                      id="dis-price"
                      className="form-control"
                    />
                  </div>
                  <div className="d-md-flex gap-4">
                    <label className="text-uppercase" htmlFor="qty">
                      qty
                    </label>
                    <input
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                      placeholder="Product Qty"
                      type="text"
                      id="qty"
                      className="form-control"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="bg-white p-4">
              <label htmlFor="description" className="text-uppercase">
                product description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                className="form-control mt-3"
                placeholder="Enter product description"
                required
              />
            </div>
          </div>
          <div className="d-flex flex-column gap-3">
            <div className="p-4 bg-white">
              <h3>SHIPPING CONFIGURATION</h3>
              <div className="d-flex flex-column gap-4">
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="free-shipping">Free Shipping</label>
                  <input
                    checked={shippingConfig?.freeShiping}
                    onChange={() =>
                      setShippingConfig({
                        freeShiping: true,
                        rate: undefined,
                      })
                    }
                    type="radio"
                    name="shipping-config"
                    id="free-shipping"
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="flat-rate">Flate Rate</label>
                  <input
                    checked={!shippingConfig?.freeShiping}
                    onChange={() =>
                      setShippingConfig({
                        freeShiping: false,
                        rate: 0,
                      })
                    }
                    type="radio"
                    name="shipping-config"
                    id="flat-rate"
                  />
                </div>
                {shippingConfig?.freeShiping === false && (
                  <div className="d-flex flex-column">
                    <label htmlFor="shipping-cost">Shipping Cost</label>
                    <input
                      className="form-control"
                      type="number"
                      id="shipping-cost"
                      value={shippingConfig?.rate}
                      onChange={(e) =>
                        setShippingConfig({
                          freeShiping: false,
                          rate: +e.target.value,
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 bg-white">
              <h3>Featured</h3>
              <div className="d-flex justify-content-between align-items-center">
                <label htmlFor="feature">Status</label>
                <input
                  checked={isFeature}
                  onChange={() => setIsFeature(!isFeature)}
                  type="checkbox"
                  id="feature"
                />
              </div>
            </div>
            <div className="p-4 bg-white">
              <h3>Hot Deals</h3>
              <div className="d-flex justify-content-between align-items-center">
                <label htmlFor="hot-deals">Status</label>
                <input
                  checked={isHotDeals}
                  onChange={() => setIsHotDeals(!isHotDeals)}
                  type="checkbox"
                  id="hot-deals"
                />
              </div>
            </div>
            <div className="p-4 bg-white">
              <h3>ESTIMATE SHIPPING TIME</h3>
              <div className="d-md-flex justify-content-between align-items-center">
                <label htmlFor="shipping-time">Days</label>
                <input
                  type="text"
                  id="shipping-time"
                  className="form-control w-auto"
                  value={shippingTime}
                  onChange={(e) => setShippingTime(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="p-4 bg-white">
              <h3>VAT & Tax</h3>
              <div className="d-md-flex justify-content-between">
                <label htmlFor="vat-tax">VAT</label>
                <div className="d-flex flex-column gap-3">
                  <input
                    type="text"
                    id="vat-tax"
                    className="form-control"
                    value={tax.rate}
                    onChange={(e) => {
                      setTax({
                        rate: +e.target.value,
                        type: tax.type,
                      });
                    }}
                  />
                  <select
                    onChange={(e) => {
                      setTax({
                        rate: tax.rate,
                        type: e.target.value,
                      });
                    }}
                    defaultValue={tax.type}
                    className="form-select"
                    id="vat"
                  >
                    <option value="Flat">Flat</option>
                    <option value="Percent">Percent</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex gap-4 my-4 ms-4">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="btn btn-danger"
          >
            <i className="bi bi-x fs-5" />
            <span>Cancel</span>
          </button>
          <button type="submit" className="btn btn-warning">
            {postLoading ? (
              <BtnLoading color="light" />
            ) : (
              <>
                <i className="bi bi-check fs-5" />
                <span>Save</span>
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}
