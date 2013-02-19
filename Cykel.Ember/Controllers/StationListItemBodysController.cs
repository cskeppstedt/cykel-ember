using Cykel.Ember.Models;
using Cykel.Ember.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Cykel.Ember.Controllers
{
    public class StationListItemBodysController : ApiController
    {
        private readonly IDbContext _dbContext;

        public StationListItemBodysController(IDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public object Get()
        {
            return new
            {
                StationListItemBodys = this._dbContext.Stations.GetAll().Select(s => new StationListItemBodyModel { bodyText = s.name, id = s.id }).ToList()
            };
        }

        public object Get(string id)
        {
            var station = this._dbContext.Stations.Get(id);

            return new
            {
                StationListItemBody = new StationListItemBodyModel() { bodyText = station.name, id = station.id }
            };
        }
    }
}
